import { fireEvent, screen } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import {
	useAdminPartnerRecommend,
	useAdminPartnerships,
} from "@/entities/partnership";
import type {
	AdminRecommendResponseDTO,
	WritePartnershipResponseDTO,
} from "@/entities/partnership/model/api-types";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import { useOpenChatRoom } from "@/features/chat";
import { renderWithProviders } from "@/shared/lib/test-utils";
import { AdminHomePage } from "./AdminHomePage";

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
		useAdminPartnerRecommend: jest.fn(),
		useAdminPartnerships: jest.fn(),
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
	storeName: string,
): WritePartnershipResponseDTO {
	return {
		partnershipId: id,
		partnershipPeriodStart: "2026-01-01",
		partnershipPeriodEnd: "2026-12-31",
		adminId: 10,
		partnerId: 20,
		storeId: id,
		storeName,
		adminName: `관리자 ${id}`,
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

function mockAdminPartnerships(content: WritePartnershipResponseDTO[]): void {
	jest.mocked(useAdminPartnerships).mockReturnValue({
		data: { content },
		isPending: false,
		isError: false,
	} as unknown as ReturnType<typeof useAdminPartnerships>);
}

function mockAdminRecommendation(data: AdminRecommendResponseDTO | null): void {
	jest.mocked(useAdminPartnerRecommend).mockReturnValue({
		data,
		isPending: false,
	} as unknown as ReturnType<typeof useAdminPartnerRecommend>);
}

describe("AdminHomePage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mocked(useRouter).mockReturnValue({
			push: mockPush,
		} as unknown as ReturnType<typeof useRouter>);
		jest.mocked(useUserBasicInfo).mockReturnValue({
			name: "관리자 사용자",
		} as ReturnType<typeof useUserBasicInfo>);
		jest.mocked(useOpenChatRoom).mockReturnValue({
			openChatRoom: mockOpenChatRoom,
			isPending: false,
		});
		mockAdminPartnerships([]);
		mockAdminRecommendation(null);
	});

	it("shows at most three store partnerships and opens the selected routes", () => {
		mockAdminPartnerships([
			makePartnership(1, "매장 1"),
			makePartnership(2, "매장 2"),
			makePartnership(3, "매장 3"),
			makePartnership(4, "매장 4"),
		]);

		renderWithProviders(<AdminHomePage />);

		expect(screen.getByText("매장 1")).toBeTruthy();
		expect(screen.getByText("매장 2")).toBeTruthy();
		expect(screen.getByText("매장 3")).toBeTruthy();
		expect(screen.queryByText("매장 4")).toBeNull();
		expect(screen.getByText("혜택 1")).toBeTruthy();

		fireEvent.press(screen.getByText("전체보기"));
		expect(mockPush).toHaveBeenCalledWith(
			"/(protected)/admin/admin-partnership-list",
		);

		mockPush.mockClear();
		fireEvent.press(screen.getByText("매장 2"));
		expect(mockPush).toHaveBeenCalledWith(
			"/(protected)/partnership-contract/2",
		);
	});

	it("connects the recommended partner using the admin role and partner ID", () => {
		mockAdminRecommendation({
			partnerId: 73,
			partnerName: "추천 매장",
			partnerAddress: "서울 주소",
			partnerDetailAddress: "상세 주소",
		});

		renderWithProviders(<AdminHomePage />);

		expect(screen.getByText("추천 매장")).toBeTruthy();
		expect(screen.getByText("서울 주소 상세 주소")).toBeTruthy();

		fireEvent.press(screen.getByText("문의하기"));

		expect(mockOpenChatRoom).toHaveBeenCalledWith({
			role: "admin",
			targetId: 73,
		});
	});
});
