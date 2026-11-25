import { fireEvent, screen } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import type { UsablePartnershipDTO } from "@/shared/api";
import { renderWithProviders } from "@/shared/lib/test-utils";
import { useStoreListData } from "../model/useStoreListData";
import { StudentStoreListWidget } from "./StudentStoreListWidget";

jest.mock("expo-router", () => ({
	useRouter: jest.fn(),
}));

jest.mock("../model/useStoreListData", () => ({
	useStoreListData: jest.fn(),
}));

const mockPush = jest.fn();
const toggleCategory = jest.fn();
const toggleAdmin = jest.fn();

type ListData = ReturnType<typeof useStoreListData>;

function mockStoreListData(overrides: Partial<ListData>): void {
	jest.mocked(useStoreListData).mockReturnValue({
		selectedCategory: null,
		toggleCategory,
		selectedAdminId: null,
		toggleAdmin,
		admins: [],
		stores: [],
		isLoading: false,
		...overrides,
	} as ListData);
}

function makePartnership(
	overrides: Partial<UsablePartnershipDTO>,
): UsablePartnershipDTO {
	return {
		partnershipId: 1,
		storeId: 100,
		partnerName: "가게 1",
		adminName: "학생회 1",
		...overrides,
	};
}

describe("StudentStoreListWidget", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mocked(useRouter).mockReturnValue({
			push: mockPush,
			back: jest.fn(),
		} as unknown as ReturnType<typeof useRouter>);
	});

	it("이용 가능한 제휴 매장이 없으면 안내 문구를 노출한다", () => {
		mockStoreListData({ stores: [], isLoading: false });

		renderWithProviders(<StudentStoreListWidget />);

		expect(screen.getByText("이용 가능한 제휴 매장이 없습니다")).toBeTruthy();
	});

	it("가게 카드를 누르면 storeId와 storeName을 담아 상세로 이동한다", () => {
		mockStoreListData({
			stores: [
				makePartnership({
					partnershipId: 1,
					storeId: 777,
					partnerName: "눌러본 가게",
				}),
			],
		});

		renderWithProviders(<StudentStoreListWidget />);

		fireEvent.press(screen.getByText("눌러본 가게"));

		expect(mockPush).toHaveBeenCalledWith({
			pathname: "/(protected)/student/store/[storeId]/detail",
			params: {
				storeId: 777,
				storeName: "눌러본 가게",
			},
		});
	});

	describe("혜택 라벨 포매팅", () => {
		it("혜택 조건이 있으면 조건 문구와 혜택 내용을 나눠 노출한다", () => {
			mockStoreListData({
				stores: [
					makePartnership({
						partnerName: "4인 가게",
						benefitCondition: "4인 이상 방문 시",
						benefit: "음료 1잔 서비스",
						minPeople: 4,
					}),
				],
			});

			renderWithProviders(<StudentStoreListWidget />);

			expect(screen.getByText("4인 이상 방문 시, ")).toBeTruthy();
			expect(screen.getByText("음료 1잔 서비스")).toBeTruthy();
		});

		it("금액 조건의 쉼표(30,000원)는 조건 문구에 그대로 유지한다", () => {
			mockStoreListData({
				stores: [
					makePartnership({
						partnerName: "금액 가게",
						benefitCondition: "30,000원 이상 주문 시",
						benefit: "사이드 메뉴 증정",
					}),
				],
			});

			renderWithProviders(<StudentStoreListWidget />);

			expect(screen.getByText("30,000원 이상 주문 시, ")).toBeTruthy();
			expect(screen.getByText("사이드 메뉴 증정")).toBeTruthy();
		});

		it("혜택 조건이 없으면 혜택 내용만 노출한다", () => {
			mockStoreListData({
				stores: [
					makePartnership({
						partnerName: "조건 없는 가게",
						benefitCondition: undefined,
						benefit: "조건 없이 서비스 제공",
					}),
				],
			});

			renderWithProviders(<StudentStoreListWidget />);

			expect(screen.getByText("조건 없이 서비스 제공")).toBeTruthy();
		});
	});
});
