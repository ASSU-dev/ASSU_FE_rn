import { fireEvent, render, screen } from "@testing-library/react-native";
import type { StoreBenefit } from "@/entities/store";
import { PartnershipSelectItem } from "./PartnershipSelectItem";

function makeBenefit(overrides: Partial<StoreBenefit> = {}): StoreBenefit {
	return {
		id: "1",
		adminId: 1,
		adminName: "IT대학 학생회",
		paperContent: "30,000원 이상 주문 시 음료 1캔 제공 (학생증 지참)",
		benefit: "음료 1캔 제공",
		type: "INDIVIDUAL",
		...overrides,
	};
}

describe("가게 상세 제휴 항목", () => {
	it("윗줄에 (유의사항) 혜택 조건 순서로, 아랫줄에 혜택 내용과 학생회 태그를 보여준다", () => {
		render(
			<PartnershipSelectItem
				benefit={makeBenefit({
					benefitCondition: "30,000원 이상 주문 시",
					caution: "학생증 지참",
				})}
				isSelected={false}
				onPress={jest.fn()}
			/>,
		);

		expect(
			screen.getByText("(학생증 지참) 30,000원 이상 주문 시"),
		).toBeTruthy();
		expect(screen.getByText("음료 1캔 제공")).toBeTruthy();
		expect(screen.getByText("IT대학 학생회")).toBeTruthy();
	});

	it("유의사항이 없으면 혜택 조건만 윗줄에 보여준다", () => {
		render(
			<PartnershipSelectItem
				benefit={makeBenefit({ benefitCondition: "30,000원 이상 주문 시" })}
				isSelected={false}
				onPress={jest.fn()}
			/>,
		);

		expect(screen.getByText("30,000원 이상 주문 시")).toBeTruthy();
	});

	it("혜택 조건이 없으면 유의사항만 괄호로 윗줄에 보여준다", () => {
		render(
			<PartnershipSelectItem
				benefit={makeBenefit({ caution: "학생증 지참" })}
				isSelected={false}
				onPress={jest.fn()}
			/>,
		);

		expect(screen.getByText("(학생증 지참)")).toBeTruthy();
	});

	it("혜택 조건과 유의사항이 모두 없으면 윗줄 없이 혜택 내용만 보여준다", () => {
		render(
			<PartnershipSelectItem
				benefit={makeBenefit({ benefitCondition: "  ", caution: undefined })}
				isSelected={false}
				onPress={jest.fn()}
			/>,
		);

		expect(screen.getByText("음료 1캔 제공")).toBeTruthy();
		expect(screen.queryByText("()")).toBeNull();
		expect(screen.queryByText(/제휴기간/)).toBeNull();
	});

	it("제휴기간은 보여주지 않는다", () => {
		render(
			<PartnershipSelectItem
				benefit={makeBenefit({
					partnershipPeriod: "제휴기간 2026.03.01 ~ 2026.12.31",
				})}
				isSelected={false}
				onPress={jest.fn()}
			/>,
		);

		expect(screen.queryByText(/제휴기간/)).toBeNull();
	});

	it("항목을 누르면 onPress가 호출된다", () => {
		const onPress = jest.fn();
		render(
			<PartnershipSelectItem
				benefit={makeBenefit()}
				isSelected={false}
				onPress={onPress}
			/>,
		);

		fireEvent.press(screen.getByText("음료 1캔 제공"));

		expect(onPress).toHaveBeenCalledTimes(1);
	});
});
