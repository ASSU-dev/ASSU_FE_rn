import { fireEvent, render, screen } from "@testing-library/react-native";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useGetRecommendCarouselPartnershipQuery } from "@/features/home/api/useGetRecommendCarouselPartnershipQuery";
import { HomeAdList } from "./HomeAdList";

jest.mock("expo-router", () => ({
	router: { push: jest.fn() },
}));

jest.mock(
	"@/features/home/api/useGetRecommendCarouselPartnershipQuery",
	() => ({
		useGetRecommendCarouselPartnershipQuery: jest.fn(),
	}),
);

type QueryShape = Partial<
	ReturnType<typeof useGetRecommendCarouselPartnershipQuery>
> & {
	data?: unknown;
};

function mockQuery(value: QueryShape): void {
	jest
		.mocked(useGetRecommendCarouselPartnershipQuery)
		.mockReturnValue(
			value as unknown as ReturnType<
				typeof useGetRecommendCarouselPartnershipQuery
			>,
		);
}

describe("HomeAdList", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("추천 광고가 없고 로딩도 끝났으면 섹션 자체를 숨긴다", () => {
		mockQuery({ isLoading: false, data: { result: [] } });

		const { toJSON } = render(<HomeAdList />);

		expect(toJSON()).toBeNull();
	});

	it("추천 광고 로딩 중일 때는 로딩 인디케이터로 자리를 유지한다", () => {
		mockQuery({ isLoading: true, data: undefined });

		const { UNSAFE_getByType } = render(<HomeAdList />);

		expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
	});

	it("추천 광고를 누르면 storeName을 쿼리 문자열로 담아 상세로 이동한다", () => {
		mockQuery({
			isLoading: false,
			data: {
				result: [
					{
						storeId: 42,
						partnerName: "추천 가게 & 바",
						belonging: "IT대",
					},
				],
			},
		});

		render(<HomeAdList />);

		fireEvent.press(screen.getByText("추천 가게 & 바"));

		expect(router.push).toHaveBeenCalledWith(
			"/(protected)/student/store/42/detail?storeName=%EC%B6%94%EC%B2%9C%20%EA%B0%80%EA%B2%8C%20%26%20%EB%B0%94",
		);
	});
});
