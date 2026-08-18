import { Controller, useFormContext } from "react-hook-form";
import type { SignupFormState } from "../../model/types";
import { AgreementFooter } from "../components/AgreementFooter";
import { FileUploadButton } from "../components/FileUploadButton";
import { AdminStepLayout } from "../layout/AdminStepLayout";

type AdminSealRegistrationStepSectionProps = {
	onPressUpload: () => void;
	onToggleAll: () => void;
	onTogglePrivacy: () => void;
	onToggleMarketing: () => void;
};

export function AdminSealRegistrationStepSection({
	onPressUpload,
	onToggleAll,
	onTogglePrivacy,
	onToggleMarketing,
}: AdminSealRegistrationStepSectionProps) {
	const { control } = useFormContext<SignupFormState>();

	return (
		<AdminStepLayout
			firstLine="단체의 인감 등록 및"
			secondLine="약관 동의를 진행해주세요!"
			contentGapClassName="flex-1"
		>
			<Controller
				control={control}
				name="admin.sealFile"
				render={({ field }) => (
					<FileUploadButton
						fileName={field.value?.name ?? ""}
						onPressUpload={onPressUpload}
						className="mt-[63px]"
					/>
				)}
			/>

			<AgreementFooter
				onToggleAll={onToggleAll}
				onTogglePrivacy={onTogglePrivacy}
				onToggleMarketing={onToggleMarketing}
			/>
		</AdminStepLayout>
	);
}
