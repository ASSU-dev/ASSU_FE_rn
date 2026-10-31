import { fireEvent, screen } from "@testing-library/react-native";
import { router } from "expo-router";
import type { StoreBenefit } from "@/entities/store";
import { renderWithProviders } from "@/shared/lib/test-utils";
import { useStoreDetailData } from "../model/useStoreDetailData";
import { StoreDetailWidget } from "./StoreDetailWidget";

jest.mock("expo-router", () => ({
	router: {
		push: jest.fn(),
		replace: jest.fn(),
	},
}));

jest.mock("react-native-keyboard-controller", () => {
	const { ScrollView } = require("react-native");
	return { KeyboardAwareScrollView: ScrollView };
});

jest.mock("../model/useStoreDetailData", () => ({
	useStoreDetailData: jest.fn(),
}));

type DetailData = ReturnType<typeof useStoreDetailData>;

const setSelectedBenefitId = jest.fn();

function makeBenefit(id: string, adminName = "학생회 A"): StoreBenefit {
	return {
		id,
		adminId: 1,
		adminName,
		paperContent: `혜택 ${id}`,
		goods: [],
		type: "INDIVIDUAL",
	};
}

function mockStoreDetailData(overrides: Partial<DetailData>): void {
	jest.mocked(useStoreDetailData).mockReturnValue({
		store: {
			storeId: 10,
			storeName: "테스트 가게",
			linkType: null,
			latitude: 37,
			longitude: 127,
			profileUrl: undefined,
		},
		benefits: [],
		selectedBenefitId: null,
		setSelectedBenefitId,
		selectedBenefit: null,
		title: "테스트 가게",
		address: "서울 상세 주소",
		images: [],
		isLoading: false,
		isError: false,
		...overrides,
	} as unknown as DetailData);
}

describe("StoreDetailWidget", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("가게 데이터가 로딩 중이면 로딩 인디케이터만 노출한다", () => {
		mockStoreDetailData({ isLoading: true, store: undefined, title: "" });

		renderWithProviders(<StoreDetailWidget storeId={10} />);

		expect(screen.queryByText("테스트 가게")).toBeNull();
	});

	it("가게 조회에 실패하면 에러 안내 문구를 노출한다", () => {
		mockStoreDetailData({ isLoading: false, isError: true, store: undefined });

		renderWithProviders(<StoreDetailWidget storeId={10} />);

		expect(screen.getByText("가게 상세 정보를 찾을 수 없습니다")).toBeTruthy();
	});

	it("외부 링크 가게는 외부 가게 전용 화면으로 자동 이동한다", () => {
		mockStoreDetailData({
			store: {
				storeId: 10,
				storeName: "외부 가게",
				linkType: "EXTERNAL",
			},
			title: "외부 가게",
		});

		renderWithProviders(<StoreDetailWidget storeId={10} />);

		expect(router.replace).toHaveBeenCalledWith(
			"/(protected)/student/external-store-link",
		);
	});

	it("혜택이 선택되지 않으면 제휴 인증 버튼이 비활성화된다", () => {
		mockStoreDetailData({
			benefits: [makeBenefit("A"), makeBenefit("B")],
			selectedBenefitId: null,
			selectedBenefit: null,
		});

		renderWithProviders(<StoreDetailWidget storeId={10} />);

		const button = screen.getByText("제휴 인증하기").parent;
		fireEvent.press(button ?? screen.getByText("제휴 인증하기"));

		expect(router.push).not.toHaveBeenCalled();
	});

	it("혜택을 선택하면 제휴 인증 플로우로 storeId와 contentId를 전달한다", () => {
		const selected = makeBenefit("42");
		mockStoreDetailData({
			benefits: [selected],
			selectedBenefitId: "42",
			selectedBenefit: selected,
		});

		renderWithProviders(<StoreDetailWidget storeId={10} />);

		fireEvent.press(screen.getByText("제휴 인증하기"));

		expect(router.push).toHaveBeenCalledWith({
			pathname: "/(protected)/student/partnership-benefit-select",
			params: {
				storeId: 10,
				preSelectedContentId: 42,
			},
		});
	});
});
