import { fireEvent, screen } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import {
	usePartnerAdminRecommend,
	usePartnerPartnerships,
} from "@/entities/partnership";
import type {
	AdminLiteDTO,
	WritePartnershipResponseDTO,
} from "@/entities/partnership/model/api-types";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { useOpenChatRoom } from "@/features/chat";
import { renderWithProviders } from "@/shared/lib/test-utils";
import { PartnerHomePage } from "./PartnerHomePage";

jest.mock("expo-router", () => ({
	useRouter: jest.fn(),
}));

jest.mock("react-native-keyboard-controller", () => {
	const { ScrollView } = require("react-native");
	return { KeyboardAwareScrollView: ScrollView };
});

jest.mock("@/entities/partnership", () => {
	const actual = jest.requireActual("@/entities/partnership");
	return {
		...actual,
		usePartnerAdminRecommend: jest.fn(),
		usePartnerPartnerships: jest.fn(),
	};
});

jest.mock("@/entities/user/model/useUserBasicInfo", () => ({
	useUserBasicInfo: jest.fn(),
}));

jest.mock("@/features/chat", () => ({
	useOpenChatRoom: jest.fn(),
}));

const mockPush = jest.fn();
const mockOpenChatRoom = jest.fn();

function makePartnership(
	id: number,
	adminName: string,
): WritePartnershipResponseDTO {
	return {
		partnershipId: id,
		partnershipPeriodStart: "2026-01-01",
		partnershipPeriodEnd: "2026-12-31",
		adminId: 10,
		partnerId: 20,
		storeId: id,
		storeName: `매장 ${id}`,
		adminName,
		isActivated: "ACTIVE",
		options: [
			{
				optionType: "SERVICE",
				criterionType: "PRICE",
				anotherType: false,
				note: `혜택 ${id}`,
				goods: [],
			},
		],
	};
}

function mockPartnerPartnerships(content: WritePartnershipResponseDTO[]): void {
	jest.mocked(usePartnerPartnerships).mockReturnValue({
		data: { content },
		isPending: false,
		isError: false,
	} as unknown as ReturnType<typeof usePartnerPartnerships>);
}

function mockPartnerRecommendations(admins: AdminLiteDTO[]): void {
	jest.mocked(usePartnerAdminRecommend).mockReturnValue({
		data: { admins },
		isPending: false,
	} as unknown as ReturnType<typeof usePartnerAdminRecommend>);
}

describe("PartnerHomePage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mocked(useRouter).mockReturnValue({
			push: mockPush,
		} as unknown as ReturnType<typeof useRouter>);
		jest.mocked(useUserBasicInfo).mockReturnValue({
			name: "제휴업체 사용자",
		} as ReturnType<typeof useUserBasicInfo>);
		jest.mocked(useOpenChatRoom).mockReturnValue({
			openChatRoom: mockOpenChatRoom,
			isPending: false,
		});
		mockPartnerPartnerships([]);
		mockPartnerRecommendations([]);
	});

	it("shows at most three admin partnerships and opens the selected routes", () => {
		mockPartnerPartnerships([
			makePartnership(1, "제휴 단체 1"),
			makePartnership(2, "제휴 단체 2"),
			makePartnership(3, "제휴 단체 3"),
			makePartnership(4, "제휴 단체 4"),
		]);

		renderWithProviders(<PartnerHomePage />);

		expect(screen.getByText("제휴 단체 1")).toBeTruthy();
		expect(screen.getByText("제휴 단체 2")).toBeTruthy();
		expect(screen.getByText("제휴 단체 3")).toBeTruthy();
		expect(screen.queryByText("제휴 단체 4")).toBeNull();
		expect(screen.getByText("제휴단체 목록")).toBeTruthy();

		fireEvent.press(screen.getByText("전체보기"));
		expect(mockPush).toHaveBeenCalledWith(
			"/(protected)/partner/partner-partnership-list",
		);

		mockPush.mockClear();
		fireEvent.press(screen.getByText("제휴 단체 2"));
		expect(mockPush).toHaveBeenCalledWith(
			"/(protected)/partnership-contract/2",
		);
	});

	it("connects a recommended admin using the partner role and admin ID", () => {
		mockPartnerRecommendations([
			{
				adminId: 91,
				adminName: "추천 단체 1",
				adminAddress: "첫 주소",
			},
			{
				adminId: 92,
				adminName: "추천 단체 2",
				adminAddress: "둘째 주소",
			},
		]);

		renderWithProviders(<PartnerHomePage />);

		expect(screen.getByText("추천 단체 1")).toBeTruthy();
		expect(screen.getByText("추천 단체 2")).toBeTruthy();

		fireEvent.press(screen.getAllByText("문의하기")[1]);

		expect(mockOpenChatRoom).toHaveBeenCalledWith({
			role: "partner",
			targetId: 92,
		});
	});
});
