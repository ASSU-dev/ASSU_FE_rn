import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import type { SignupSchool } from "@/entities/signup";
import { SCHOOL_SELECT_OPTIONS } from "@/entities/signup";
import type { SignupFormState } from "@/features/signup-user-flow/model/types";
import { Select } from "@/shared/ui/select";
import { SignupStepTitle } from "../SignupStepTitle";

type SchoolStepSectionProps = {
	onSelectSchool: (school: SignupSchool) => void;
};

export function SchoolStepSection({ onSelectSchool }: SchoolStepSectionProps) {
	const { control } = useFormContext<SignupFormState>();

	return (
		<View className="mt-[46px] gap-[56px]">
			<SignupStepTitle
				firstLine="재학중이신 학교를"
				secondLine="선택해주세요!"
			/>
			<View className="gap-[8px]">
				<Controller
					control={control}
					name="student.school"
					render={({ field }) => (
						<Select
							label="학교선택"
							items={SCHOOL_SELECT_OPTIONS}
							value={field.value}
							presentation="inline"
							onChange={(value) => {
								field.onChange(value);
								if (value === "숭실대학교") {
									onSelectSchool("숭실대학교");
								}
							}}
							placeholder="학교를 선택해주세요"
						/>
					)}
				/>
			</View>
		</View>
	);
}
