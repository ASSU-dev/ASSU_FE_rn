import type { SignupAdminOrganizationType } from "@/features/signup-user-flow/model/types";
import {
	ADMIN_ORGANIZATION_TYPE_OPTIONS,
} from "@/features/signup-user-flow/model/data/adminOptions";
import { Select } from "@/shared/ui/select";
import { AdminStepLayout } from "../layout/AdminStepLayout";

type AdminOrganizationTypeStepSectionProps = {
	organizationType: SignupAdminOrganizationType | null;
	onChangeOrganizationType: (value: SignupAdminOrganizationType | null) => void;
};

export function AdminOrganizationTypeStepSection({
	organizationType,
	onChangeOrganizationType,
}: AdminOrganizationTypeStepSectionProps) {
	return (
		<AdminStepLayout
			firstLine="관리단체의 정보를"
			secondLine="입력해주세요"
		>
			<Select
				label="단위"
				items={ADMIN_ORGANIZATION_TYPE_OPTIONS}
				value={organizationType}
				onChange={(value) =>
					onChangeOrganizationType(value as SignupAdminOrganizationType | null)
				}
				placeholder="단위 선택"
				presentation="inline"
			/>
		</AdminStepLayout>
	);
}
