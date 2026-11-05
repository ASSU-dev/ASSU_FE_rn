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
		it("HEADCOUNT 조건이면 '{people}인 이상' 문구와 category 혜택을 함께 노출한다", () => {
			mockStoreListData({
				stores: [
					makePartnership({
						partnerName: "4인 가게",
						criterionType: "HEADCOUNT",
						people: 4,
						category: "음료 1잔 서비스",
					}),
				],
			});

			renderWithProviders(<StudentStoreListWidget />);

			expect(screen.getByText("4인 이상 이용 시, ")).toBeTruthy();
			expect(screen.getByText("음료 1잔 서비스")).toBeTruthy();
		});

		it("PRICE 조건이면 금액을 콤마 포맷으로 노출한다", () => {
			mockStoreListData({
				stores: [
					makePartnership({
						partnerName: "금액 가게",
						criterionType: "PRICE",
						cost: 15000,
						category: "사이드 메뉴 증정",
					}),
				],
			});

			renderWithProviders(<StudentStoreListWidget />);

			expect(screen.getByText("15,000원 이상 시, ")).toBeTruthy();
			expect(screen.getByText("사이드 메뉴 증정")).toBeTruthy();
		});

		it("DISCOUNT 조건은 할인율 하이라이트는 노출하지 않는다", () => {
			// 코드 분기: criterionType이 PRICE/HEADCOUNT가 아니면 benefitHighlight는 할인율
			// 그러나 PRICE/HEADCOUNT 조건이 함께 있어야 benefitLabel이 조립됨
			mockStoreListData({
				stores: [
					makePartnership({
						partnerName: "할인 가게",
						optionType: "DISCOUNT",
						discountRate: 20,
						note: "20% 할인 전용",
					}),
				],
			});

			renderWithProviders(<StudentStoreListWidget />);

			// 조건이 없으므로 note가 benefitLabel로 사용된다
			expect(screen.getByText("20% 할인 전용")).toBeTruthy();
		});

		it("조건(people, cost)이 없으면 note를 그대로 혜택 라벨로 사용한다", () => {
			mockStoreListData({
				stores: [
					makePartnership({
						partnerName: "노트 가게",
						note: "조건 없이 서비스 제공",
					}),
				],
			});

			renderWithProviders(<StudentStoreListWidget />);

			expect(screen.getByText("조건 없이 서비스 제공")).toBeTruthy();
		});
	});
});
