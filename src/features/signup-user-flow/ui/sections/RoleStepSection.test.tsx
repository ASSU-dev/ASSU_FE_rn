import { fireEvent, render } from "@testing-library/react-native";
import { USER_TYPE } from "@/entities/user/model/types";
import { RoleStepSection } from "./RoleStepSection";

describe("RoleStepSection", () => {
	it("shows every available role and selects the role the user presses", () => {
		const onSelectRole = jest.fn();
		const screen = render(
			<RoleStepSection selectedRole={null} onSelectRole={onSelectRole} />,
		);

		expect(screen.getByText("관리자")).toBeTruthy();
		expect(screen.getByText("제휴업체")).toBeTruthy();
		expect(screen.getByText("사용자")).toBeTruthy();

		fireEvent.press(screen.getByText("제휴업체"));
		expect(onSelectRole).toHaveBeenCalledWith(USER_TYPE.PARTNER);
	});
});
