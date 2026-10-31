import { fireEvent, render, screen } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { HomeTabSection } from "./HomeTabSection";

jest.mock("expo-router", () => ({
	useRouter: jest.fn(),
}));

jest.mock("@/widgets/stamp-board/ui/StampBoard", () => {
	const { Text } = require("react-native");
	return {
		StampBoard: ({ currentCount }: { currentCount: number }) => (
			<Text>{`StampBoard:${currentCount}`}</Text>
		),
	};
});

const mockPush = jest.fn();

describe("HomeTabSection", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mocked(useRouter).mockReturnValue({
			push: mockPush,
		} as unknown as ReturnType<typeof useRouter>);
	});

	it("기본 진입 시 카테고리 10개가 모두 노출된다", () => {
		render(<HomeTabSection stampCount={0} />);

		for (const label of [
			"음식점",
			"카페·디저트",
			"주점",
			"뷰티",
			"문화·오락",
			"헬스·스포츠",
			"생활편의",
			"병원·약국",
			"학습공간",
			"기타",
		]) {
			expect(screen.getByText(label)).toBeTruthy();
		}
	});

	it("이벤트 탭으로 전환하면 스탬프 보드가 노출되고 카테고리는 사라진다", () => {
		render(<HomeTabSection stampCount={3} />);

		fireEvent.press(screen.getByText("이벤트"));

		expect(screen.getByText("StampBoard:3")).toBeTruthy();
		expect(screen.queryByText("음식점")).toBeNull();
	});

	it("카테고리를 선택하면 가게 리스트로 category 파라미터와 함께 이동한다", () => {
		render(<HomeTabSection stampCount={0} />);

		fireEvent.press(screen.getByText("카페·디저트"));

		expect(mockPush).toHaveBeenCalledWith({
			pathname: "/(protected)/student/store-list",
			params: { category: "CAFE" },
		});
	});

	it("두 번째 줄 카테고리도 올바른 enum 값으로 이동한다", () => {
		render(<HomeTabSection stampCount={0} />);

		fireEvent.press(screen.getByText("학습공간"));

		expect(mockPush).toHaveBeenCalledWith({
			pathname: "/(protected)/student/store-list",
			params: { category: "EDUCATION" },
		});
	});
});
