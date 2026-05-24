import { Controller, useFormContext } from "react-hook-form";
import { ADMIN_ORGANIZATION_TYPE_OPTIONS } from "@/features/signup-user-flow/model/data/adminOptions";
import type {
	SignupAdminOrganizationType,
	SignupFormState,
} from "@/features/signup-user-flow/model/types";
import { Select } from "@/shared/ui/select";
import { AdminStepLayout } from "../layout/AdminStepLayout";

type AdminOrganizationTypeStepSectionProps = {
	onChangeOrganizationType: (value: SignupAdminOrganizationType | null) => void;
};

export function AdminOrganizationTypeStepSection({
	onChangeOrganizationType,
}: AdminOrganizationTypeStepSectionProps) {
	const { control } = useFormContext<SignupFormState>();

	return (
		<AdminStepLayout firstLine="관리단체의 정보를" secondLine="입력해주세요">
			<Controller
				control={control}
				name="admin.organizationType"
				render={({ field }) => (
					<Select
						label="단위"
						items={ADMIN_ORGANIZATION_TYPE_OPTIONS}
						value={field.value}
						onChange={(value) => {
							field.onChange(value);
							onChangeOrganizationType(
								value as SignupAdminOrganizationType | null,
							);
						}}
						placeholder="단위 선택"
						presentation="inline"
					/>
				)}
			/>
		</AdminStepLayout>
	);
}
