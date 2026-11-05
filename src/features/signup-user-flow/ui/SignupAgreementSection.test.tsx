import { fireEvent, render } from "@testing-library/react-native";
import { SignupAgreementSection } from "./SignupAgreementSection";

describe("SignupAgreementSection", () => {
	it("shows each agreement state and forwards its toggle actions", () => {
		const onToggleAll = jest.fn();
		const onTogglePrivacy = jest.fn();
		const onToggleMarketing = jest.fn();
		const screen = render(
			<SignupAgreementSection
				agreeAll={false}
				agreePrivacy
				agreeMarketing={false}
				onToggleAll={onToggleAll}
				onTogglePrivacy={onTogglePrivacy}
				onToggleMarketing={onToggleMarketing}
			/>,
		);

		const checkboxes = screen.getAllByRole("checkbox");
		expect(
			checkboxes.map((checkbox) => checkbox.props.accessibilityState.checked),
		).toEqual([false, true, false]);

		fireEvent.press(screen.getByText("약관 전체동의"));
		fireEvent.press(screen.getByText("개인정보 및 위치정보 수집 동의 (필수)"));
		fireEvent.press(screen.getByText("Email 및 SMS 마케팅 수신 동의 (선택)"));

		expect(onToggleAll).toHaveBeenCalledTimes(1);
		expect(onTogglePrivacy).toHaveBeenCalledTimes(1);
		expect(onToggleMarketing).toHaveBeenCalledTimes(1);
	});
});
