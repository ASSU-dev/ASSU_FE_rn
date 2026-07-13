import { Controller, useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";
import { Select } from "@/shared/ui/select";
import { shouldShowAdminOfficeAddressBySelection } from "../../model/admin";
import {
	ADMIN_COLLEGE_OPTIONS,
	ADMIN_DEPARTMENT_OPTIONS,
	ADMIN_ORGANIZATION_TYPE_OPTIONS,
} from "../../model/data/adminOptions";
import type {
	SignupAdminOrganizationType,
	SignupFormState,
} from "../../model/types";
import { OfficeAddressPicker } from "../components/OfficeAddressPicker";
import { LabeledInputField } from "../LabeledInputField";
import { AdminStepLayout } from "../layout/AdminStepLayout";

type AdminOrganizationInfoStepSectionProps = {
	officeAddress: string;
	officeAddressDetail: string;
	onChangeOrganizationType: (value: SignupAdminOrganizationType | null) => void;
	onChangeCollege: (value: string | null) => void;
	onChangeDepartment: (value: string | null) => void;
	onChangeOfficeAddressDetail: (value: string) => void;
	onPressOfficeAddress: () => void;
};

export function AdminOrganizationInfoStepSection({
	officeAddress,
	officeAddressDetail,
	onChangeOrganizationType,
	onChangeCollege,
	onChangeDepartment,
	onChangeOfficeAddressDetail,
	onPressOfficeAddress,
}: AdminOrganizationInfoStepSectionProps) {
	const { control } = useFormContext<SignupFormState>();
	const organizationType = useWatch({
		control,
		name: "admin.organizationType",
	});
	const collegeId = useWatch({ control, name: "admin.collegeId" });
	const departmentId = useWatch({ control, name: "admin.departmentId" });
	const shouldShowOfficeAddress = shouldShowAdminOfficeAddressBySelection(
		organizationType as SignupAdminOrganizationType | null,
		collegeId,
		departmentId,
	);

	return (
		<AdminStepLayout firstLine="관리단체의 정보를" secondLine="입력해주세요">
			<View className="gap-[10px]">
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
					<Controller
						control={control}
						name="admin.collegeId"
						render={({ field }) => (
							<Select
								label="단과대 선택"
								items={ADMIN_COLLEGE_OPTIONS}
								value={field.value}
								onChange={(value) => {
									field.onChange(value);
									onChangeCollege(value);
								}}
								placeholder="단과대 선택"
								presentation="inline"
							/>
						)}
					/>
				) : null}

				{organizationType === "DEPARTMENT_STUDENT_COUNCIL" ? (
					<Controller
						control={control}
						name="admin.departmentId"
						render={({ field }) => (
							<Select
								label="학과/부 선택"
								items={ADMIN_DEPARTMENT_OPTIONS}
								value={field.value}
								onChange={(value) => {
									field.onChange(value);
									onChangeDepartment(value);
								}}
								placeholder="학과/부 선택"
								presentation="inline"
							/>
						)}
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
