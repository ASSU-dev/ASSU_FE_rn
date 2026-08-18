import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import type { SignupFormState } from "../../model/types";
import { AgreementFooter } from "../components/AgreementFooter";
import { FileUploadButton } from "../components/FileUploadButton";
import { SignupStepTitle } from "../SignupStepTitle";

type PartnerBusinessRegistrationStepSectionProps = {
	onPressUpload: () => void;
	onToggleAll: () => void;
	onTogglePrivacy: () => void;
	onToggleMarketing: () => void;
};

export function PartnerBusinessRegistrationStepSection({
	onPressUpload,
	onToggleAll,
	onTogglePrivacy,
	onToggleMarketing,
}: PartnerBusinessRegistrationStepSectionProps) {
	const { control } = useFormContext<SignupFormState>();

	return (
		<View className="mt-[46px] flex-1">
			<View className="gap-[63px]">
				<SignupStepTitle
					firstLine="사업자 등록증 등록 및"
					secondLine="약관 동의를 진행해주세요!"
					highlight="사업자 등록증"
				/>
				<Controller
					control={control}
					name="partner.businessRegistrationFile"
					render={({ field }) => (
						<FileUploadButton
							fileName={field.value?.name ?? ""}
							onPressUpload={onPressUpload}
						/>
					)}
				/>
			</View>
			<AgreementFooter
				onToggleAll={onToggleAll}
				onTogglePrivacy={onTogglePrivacy}
				onToggleMarketing={onToggleMarketing}
			/>
		</View>
	);
}
