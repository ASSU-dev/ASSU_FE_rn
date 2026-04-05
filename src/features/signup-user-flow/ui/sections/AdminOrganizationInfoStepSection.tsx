import { View } from "react-native";
import { shouldShowAdminOfficeAddressBySelection } from "@/features/signup-user-flow/model/admin";
import type { SignupAdminOrganizationType } from "@/features/signup-user-flow/model/types";
import {
	ADMIN_COLLEGE_OPTIONS,
	ADMIN_DEPARTMENT_OPTIONS,
	ADMIN_ORGANIZATION_TYPE_OPTIONS,
} from "@/features/signup-user-flow/model/data/adminOptions";
import { Select } from "@/shared/ui/select";
import { AdminStepLayout } from "../layout/AdminStepLayout";
import { LabeledInputField } from "../LabeledInputField";
import { OfficeAddressPicker } from "../components/OfficeAddressPicker";

type AdminOrganizationInfoStepSectionProps = {
	organizationType: SignupAdminOrganizationType | null;
	collegeId: string | null;
	departmentId: string | null;
	officeAddress: string;
	officeAddressDetail: string;
	onChangeOrganizationType: (value: SignupAdminOrganizationType | null) => void;
	onChangeCollege: (value: string | null) => void;
	onChangeDepartment: (value: string | null) => void;
	onChangeOfficeAddressDetail: (value: string) => void;
	onPressOfficeAddress: () => void;
};

export function AdminOrganizationInfoStepSection({
	organizationType,
	collegeId,
	departmentId,
	officeAddress,
	officeAddressDetail,
	onChangeOrganizationType,
	onChangeCollege,
	onChangeDepartment,
	onChangeOfficeAddressDetail,
	onPressOfficeAddress,
}: AdminOrganizationInfoStepSectionProps) {
	const shouldShowOfficeAddress = shouldShowAdminOfficeAddressBySelection(
		organizationType,
		collegeId,
		departmentId,
	);

	return (
		<AdminStepLayout
			firstLine="관리단체의 정보를"
			secondLine="입력해주세요"
		>
			<View className="gap-[10px]">
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

				{organizationType === "GENERAL_STUDENT_COUNCIL" ? (
					<LabeledInputField
						label="대상"
						value="총학생회"
						editable={false}
						inputTextColor="contentSecondary"
					/>
				) : null}

				{organizationType === "COLLEGE_STUDENT_COUNCIL" ||
				organizationType === "DEPARTMENT_STUDENT_COUNCIL" ? (
					<Select
						label="단과대 선택"
						items={ADMIN_COLLEGE_OPTIONS}
						value={collegeId}
						onChange={onChangeCollege}
						placeholder="단과대 선택"
						presentation="inline"
					/>
				) : null}

				{organizationType === "DEPARTMENT_STUDENT_COUNCIL" ? (
					<Select
						label="학과/부 선택"
						items={ADMIN_DEPARTMENT_OPTIONS}
						value={departmentId}
						onChange={onChangeDepartment}
						placeholder="학과/부 선택"
						presentation="inline"
					/>
				) : null}

				{shouldShowOfficeAddress ? (
					<OfficeAddressPicker
						officeAddress={officeAddress}
						officeAddressDetail={officeAddressDetail}
						onPressOfficeAddress={onPressOfficeAddress}
						onChangeOfficeAddressDetail={onChangeOfficeAddressDetail}
						gapClassName="gap-[10px]"
					/>
				) : null}
			</View>
		</AdminStepLayout>
	);
}
