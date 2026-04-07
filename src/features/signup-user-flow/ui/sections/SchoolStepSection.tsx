import { View } from "react-native";
import type { SignupSchool } from "@/entities/signup";
import { SCHOOL_SELECT_OPTIONS } from "@/entities/signup";
import { Select } from "@/shared/ui/select";
import { SignupStepTitle } from "../SignupStepTitle";

type SchoolStepSectionProps = {
	school: SignupSchool | null;
	onSelectSchool: (school: SignupSchool) => void;
};

export function SchoolStepSection({
	school,
	onSelectSchool,
}: SchoolStepSectionProps) {
	return (
		<View className="mt-[46px] gap-[56px]">
			<SignupStepTitle
				firstLine="재학중이신 학교를"
				secondLine="선택해주세요!"
			/>
			<View className="gap-[8px]">
				<Select
					label="학교선택"
					items={SCHOOL_SELECT_OPTIONS}
					value={school}
					presentation="inline"
					onChange={(value) => {
						if (value === "숭실대학교") {
							onSelectSchool("숭실대학교");
						}
					}}
					placeholder="학교를 선택해주세요"
				/>
			</View>
		</View>
	);
}
