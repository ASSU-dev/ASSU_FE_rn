import { fireEvent, render, screen } from "@testing-library/react-native";
import { ActivityIndicator } from "react-native";
import type { Partnership } from "@/entities/partnership";
import { PartnershipListWidget } from "./PartnershipListWidget";

const partnerships: Partnership[] = [1, 2, 3, 4].map((id) => ({
	id: String(id),
	storeName: `제휴업체 ${id}`,
	benefitContent: `혜택 ${id}`,
	startDate: "2026-01-01",
	endDate: "2026-12-31",
}));

describe("PartnershipListWidget", () => {
	it("shows only the configured number of partnerships", () => {
		render(
			<PartnershipListWidget
				partnerships={partnerships}
				maxItems={3}
				onViewAll={jest.fn()}
			/>,
		);

		expect(screen.getByText("제휴업체 1")).toBeTruthy();
		expect(screen.getByText("제휴업체 2")).toBeTruthy();
		expect(screen.getByText("제휴업체 3")).toBeTruthy();
		expect(screen.queryByText("제휴업체 4")).toBeNull();
	});

	it("shows the empty state without a view-all action", () => {
		render(
			<PartnershipListWidget
				partnerships={[]}
				emptyTitle="함께하는 제휴가 없어요"
				emptyDescription="제휴를 시작해보세요"
				onViewAll={jest.fn()}
			/>,
		);

		expect(screen.getByText("함께하는 제휴가 없어요")).toBeTruthy();
		expect(screen.queryByText("전체보기")).toBeNull();
	});

	it("shows a loading indicator while the list is loading", () => {
		const { UNSAFE_getByType } = render(
			<PartnershipListWidget partnerships={[]} isLoading={true} />,
		);

		expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
	});

	it("shows an error state when the list request fails", () => {
		render(<PartnershipListWidget partnerships={[]} isError={true} />);

		expect(screen.getByText("목록을 불러오지 못했어요")).toBeTruthy();
		expect(screen.getByText("잠시 후 다시 시도해주세요")).toBeTruthy();
	});

	it("opens the full list when the view-all action is pressed", () => {
		const onViewAll = jest.fn();
		render(
			<PartnershipListWidget
				partnerships={partnerships}
				onViewAll={onViewAll}
			/>,
		);

		fireEvent.press(screen.getByText("전체보기"));

		expect(onViewAll).toHaveBeenCalledTimes(1);
	});
});
