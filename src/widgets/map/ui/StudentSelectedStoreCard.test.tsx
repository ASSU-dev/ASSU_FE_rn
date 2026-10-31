import { fireEvent, render, screen } from "@testing-library/react-native";
import { StudentSelectedStoreCard } from "./StudentSelectedStoreCard";

const handlers = {
	onPress: jest.fn(),
	onCertifyPress: jest.fn(),
	onClose: jest.fn(),
};

describe("StudentSelectedStoreCard 선택 매장 정보와 버튼", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("매장 이름·대표 혜택·추가 혜택 개수·거리를 함께 보여 준다", async () => {
		await render(
			<StudentSelectedStoreCard
				name="카페 A"
				benefitLabel="4인이상 식사시,"
				benefitHighlight="음료제공"
				extraBenefitCount={2}
				distanceText="350m"
				tag="IT대 학생회"
				{...handlers}
			/>,
		);

		expect(screen.getByText("카페 A")).toBeTruthy();
		expect(screen.getByText("4인이상 식사시,")).toBeTruthy();
		expect(screen.getByText("음료제공")).toBeTruthy();
		expect(screen.getByText("외 2가지 제휴 • 350m")).toBeTruthy();
		expect(screen.getByText("IT대 학생회")).toBeTruthy();
	});

	it("추가 혜택과 거리 정보가 없으면 부가 정보 줄을 표시하지 않는다", async () => {
		await render(
			<StudentSelectedStoreCard
				name="카페 A"
				extraBenefitCount={0}
				{...handlers}
			/>,
		);

		expect(screen.queryByText(/가지 제휴/)).toBeNull();
	});

	it("카드 본문을 탭하면 매장 상세로 이동한다", async () => {
		// Given
		await render(<StudentSelectedStoreCard name="카페 A" {...handlers} />);

		// When
		await fireEvent.press(screen.getByText("카페 A"));

		// Then
		expect(handlers.onPress).toHaveBeenCalledTimes(1);
		expect(handlers.onCertifyPress).not.toHaveBeenCalled();
	});

	it("제휴 인증하기를 탭하면 상세 이동 없이 제휴 인증만 시작한다", async () => {
		// Given
		await render(<StudentSelectedStoreCard name="카페 A" {...handlers} />);

		// When
		await fireEvent.press(screen.getByText("제휴 인증하기"), {
			stopPropagation: jest.fn(),
		});

		// Then
		expect(handlers.onCertifyPress).toHaveBeenCalledTimes(1);
		expect(handlers.onPress).not.toHaveBeenCalled();
	});

	it("닫기 버튼을 탭하면 카드를 닫는다", async () => {
		// Given
		await render(<StudentSelectedStoreCard name="카페 A" {...handlers} />);

		// When
		await fireEvent.press(screen.getByLabelText("카페 A 카드 닫기"));

		// Then
		expect(handlers.onClose).toHaveBeenCalledTimes(1);
	});
});
