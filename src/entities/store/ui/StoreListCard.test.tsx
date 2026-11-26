import { render, screen } from "@testing-library/react-native";
import { StoreListCard } from "./StoreListCard";

describe("가게 리스트 카드의 추가 제휴 문구", () => {
	it("대표 혜택 외 제휴가 있으면 extraCount 그대로 '외 N가지 제휴'로 보여준다", () => {
		render(
			<StoreListCard
				name="카페봄봄 숭실대점"
				benefitHighlight="한 잔에 샷 추가"
				extraBenefitCount={1}
			/>,
		);

		expect(screen.getByText("외 1가지 제휴")).toBeTruthy();
		expect(screen.queryByText(/총/)).toBeNull();
	});

	it("extraCount를 더하지 않고 값 그대로 보여준다", () => {
		render(<StoreListCard name="가게" extraBenefitCount={3} />);

		expect(screen.getByText("외 3가지 제휴")).toBeTruthy();
	});

	it("추가 제휴가 없으면 제휴 문구를 보여주지 않는다", () => {
		render(<StoreListCard name="가게" extraBenefitCount={0} />);

		expect(screen.queryByText(/가지 제휴/)).toBeNull();
	});

	it("거리와 함께 보여줄 때는 점으로 구분한다", () => {
		render(
			<StoreListCard name="가게" extraBenefitCount={2} distanceText="1.5km" />,
		);

		expect(screen.getByText("외 2가지 제휴 • 1.5km")).toBeTruthy();
	});

	it("추가 제휴가 없어도 거리는 보여준다", () => {
		render(<StoreListCard name="가게" distanceText="300m" />);

		expect(screen.getByText("300m")).toBeTruthy();
	});
});
