import { fireEvent, render, screen } from "@testing-library/react-native";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
import type { CurationStoreDTO } from "@/shared/api";
import { HomeCurationSection } from "./HomeCurationSection";

jest.mock("expo-router", () => ({
	router: { push: jest.fn() },
}));

function makeStore(overrides: Partial<CurationStoreDTO>): CurationStoreDTO {
	return {
		storeId: 1,
		storeName: "큐레이션 가게",
		discountContent: "10% 할인",
		...overrides,
	};
}

describe("HomeCurationSection", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("로딩 중이면 ActivityIndicator로 자리를 유지한다", () => {
		const { UNSAFE_getByType } = render(
			<HomeCurationSection curationTitle="추천" groupTitle="그룹" isLoading />,
		);

		expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
	});

	it("stores가 비어 있으면 섹션 자체를 숨긴다", () => {
		const { toJSON } = render(
			<HomeCurationSection
				curationTitle="추천"
				groupTitle="그룹"
				stores={[]}
			/>,
		);

		expect(toJSON()).toBeNull();
	});

	it("stores가 undefined여도 섹션을 숨긴다", () => {
		const { toJSON } = render(
			<HomeCurationSection curationTitle="추천" groupTitle="그룹" />,
		);

		expect(toJSON()).toBeNull();
	});

	it("큐레이션 가게를 누르면 storeName을 쿼리 문자열로 담아 상세로 이동한다", () => {
		render(
			<HomeCurationSection
				curationTitle="추천"
				groupTitle="그룹"
				stores={[
					makeStore({
						storeId: 55,
						storeName: "눌러본 가게",
					}),
				]}
			/>,
		);

		fireEvent.press(screen.getByText("눌러본 가게"));

		expect(router.push).toHaveBeenCalledWith(
			"/(protected)/student/store/55/detail?storeName=%EB%88%8C%EB%9F%AC%EB%B3%B8%20%EA%B0%80%EA%B2%8C",
		);
	});

	it("curationTitle과 groupTitle을 조합한 섹션 제목을 노출한다", () => {
		render(
			<HomeCurationSection
				curationTitle="홍길동님을 위한 추천"
				groupTitle="평점 좋은 가게"
				stores={[makeStore({ storeId: 1 })]}
			/>,
		);

		expect(
			screen.getByText("홍길동님을 위한 추천 • 평점 좋은 가게"),
		).toBeTruthy();
	});
});
