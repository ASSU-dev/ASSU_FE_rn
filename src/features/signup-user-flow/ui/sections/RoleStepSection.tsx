import { View } from "react-native";
import { SIGNUP_ROLE_OPTIONS } from "@/entities/signup";
import type { UserType } from "@/entities/user/model/types";
import { SelectableOptionField } from "../SelectableOptionField";
import { SignupStepTitle } from "../SignupStepTitle";

type RoleStepSectionProps = {
	selectedRole: UserType | null;
	onSelectRole: (role: UserType) => void;
};

export function RoleStepSection({
	selectedRole,
	onSelectRole,
}: RoleStepSectionProps) {
	const hasSelection = selectedRole !== null;

	return (
		<View className="mt-[46px] gap-[56px]">
			<SignupStepTitle firstLine="가입유형을" secondLine="선택해주세요!" />
			<View className="gap-[15px]">
				{SIGNUP_ROLE_OPTIONS.map((option) => (
					<SelectableOptionField
						key={option.value}
						label={option.label}
						selected={selectedRole === option.value}
						hasSelection={hasSelection}
						onPress={() => onSelectRole(option.value)}
					/>
				))}
			</View>
		</View>
	);
}
