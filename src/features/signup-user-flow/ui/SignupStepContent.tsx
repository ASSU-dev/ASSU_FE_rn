import {
	findAddressOption,
} from "@/features/signup-user-flow/model/admin";
import type { SignupFormState, SignupStep } from "@/features/signup-user-flow/model/types";
import { useFormContext } from "react-hook-form";
import { AdminCredentialsStepSection } from "./sections/AdminCredentialsStepSection";
import { AdminOrganizationInfoStepSection } from "./sections/AdminOrganizationInfoStepSection";
import { AdminOrganizationTypeStepSection } from "./sections/AdminOrganizationTypeStepSection";
import { AdminSealRegistrationStepSection } from "./sections/AdminSealRegistrationStepSection";
import { CompleteStepSection } from "./sections/CompleteStepSection";
import { IdentityStepSection } from "./sections/IdentityStepSection";
import { PartnerBusinessRegistrationStepSection } from "./sections/PartnerBusinessRegistrationStepSection";
import { PartnerCompanyInfoStepSection } from "./sections/PartnerCompanyInfoStepSection";
import { PartnerCredentialsStepSection } from "./sections/PartnerCredentialsStepSection";
import { RoleStepSection } from "./sections/RoleStepSection";
import { SchoolStepSection } from "./sections/SchoolStepSection";
import { StudentAgreementStepSection } from "./sections/StudentAgreementStepSection";
import { StudentVerificationStepSection } from "./sections/StudentVerificationStepSection";

type IdentityActions = {
	onChangePhone: (value: string) => void;
	onChangeVerificationCode: (value: string) => void;
	onSendCode: () => void;
	onPressInfoLink: () => void;
};

type StudentActions = {
	onSelectRole: (role: NonNullable<SignupFormState["role"]>) => void;
	onSelectSchool: (school: NonNullable<SignupFormState["student"]["school"]>) => void;
	onPressStudentVerify: () => void;
};

type PartnerActions = {
	onChangePartnerEmail: (value: string) => void;
	onChangePartnerPassword: (value: string) => void;
	onChangePartnerCompanyName: (value: string) => void;
	onChangePartnerOfficeAddressDetail: (value: string) => void;
	onPressPartnerOfficeAddress: () => void;
	onPressPartnerBusinessRegistrationUpload: () => void;
};

type AdminActions = {
	onChangeAdminEmail: (value: string) => void;
	onChangeAdminPassword: (value: string) => void;
	onChangeAdminOrganizationType: (
		value: NonNullable<SignupFormState["admin"]["organizationType"]> | null,
	) => void;
	onChangeAdminCollege: (value: string | null) => void;
	onChangeAdminDepartment: (value: string | null) => void;
	onChangeAdminOfficeAddressDetail: (value: string) => void;
	onPressAdminOfficeAddress: () => void;
	onPressAdminSealUpload: () => void;
};

type AgreementActions = {
	onToggleAgreeAll: () => void;
	onToggleAgreePrivacy: () => void;
	onToggleAgreeMarketing: () => void;
};

type SignupStepContentProps = {
	step: SignupStep;
	countdown: string;
	completeDisplayName: string;
	isVerificationError: boolean;
	actions: {
		identity: IdentityActions;
		student: StudentActions;
		partner: PartnerActions;
		admin: AdminActions;
		agreements: AgreementActions;
	};
};

export function SignupStepContent({
	step,
	countdown,
	completeDisplayName,
	isVerificationError,
	actions,
}: SignupStepContentProps) {
	const { watch } = useFormContext<SignupFormState>();
	const form = watch();

	switch (step) {
		case "login1":
		case "loginForm":
			return null;
		case "identity":
			return (
				<IdentityStepSection
					phone={form.identity.phone}
					verificationCode={form.identity.verificationCode}
					isCodeSent={form.identity.isCodeSent}
					countdown={countdown}
					isVerificationError={isVerificationError}
					onChangePhone={actions.identity.onChangePhone}
					onChangeVerificationCode={actions.identity.onChangeVerificationCode}
					onSendCode={actions.identity.onSendCode}
					onPressInfoLink={actions.identity.onPressInfoLink}
				/>
			);
		case "role":
			return (
				<RoleStepSection
					selectedRole={form.role}
					onSelectRole={actions.student.onSelectRole}
				/>
			);
		case "school":
			return (
				<SchoolStepSection
					school={form.student.school}
					onSelectSchool={actions.student.onSelectSchool}
				/>
			);
		case "studentInput1":
			return (
				<StudentVerificationStepSection
					school={form.student.school ?? "숭실대학교"}
					onPressVerify={actions.student.onPressStudentVerify}
				/>
			);
		case "studentInput2":
		case "studentInput3":
			return (
				<StudentAgreementStepSection
					major={form.student.major}
					studentId={form.student.studentId}
					agreeAll={form.agreements.agreeAll}
					agreePrivacy={form.agreements.agreePrivacy}
					agreeMarketing={form.agreements.agreeMarketing}
					onToggleAll={actions.agreements.onToggleAgreeAll}
					onTogglePrivacy={actions.agreements.onToggleAgreePrivacy}
					onToggleMarketing={actions.agreements.onToggleAgreeMarketing}
				/>
			);
		case "partnerCredentials":
			return (
				<PartnerCredentialsStepSection
					partnerEmail={form.partner.email}
					partnerPassword={form.partner.password}
					onChangePartnerEmail={actions.partner.onChangePartnerEmail}
					onChangePartnerPassword={actions.partner.onChangePartnerPassword}
				/>
			);
		case "adminCredentials":
			return (
				<AdminCredentialsStepSection
					adminEmail={form.admin.email}
					adminPassword={form.admin.password}
					onChangeAdminEmail={actions.admin.onChangeAdminEmail}
					onChangeAdminPassword={actions.admin.onChangeAdminPassword}
				/>
			);
		case "adminOrganizationType":
			return (
				<AdminOrganizationTypeStepSection
					organizationType={form.admin.organizationType}
					onChangeOrganizationType={actions.admin.onChangeAdminOrganizationType}
				/>
			);
		case "adminOrganizationInfo":
			return (
				<AdminOrganizationInfoStepSection
					organizationType={form.admin.organizationType}
					collegeId={form.admin.collegeId}
					departmentId={form.admin.departmentId}
					officeAddress={
						findAddressOption(form.admin.officeAddressId)?.label ?? ""
					}
					officeAddressDetail={form.admin.officeAddressDetail}
					onChangeOrganizationType={actions.admin.onChangeAdminOrganizationType}
					onChangeCollege={actions.admin.onChangeAdminCollege}
					onChangeDepartment={actions.admin.onChangeAdminDepartment}
					onChangeOfficeAddressDetail={
						actions.admin.onChangeAdminOfficeAddressDetail
					}
					onPressOfficeAddress={actions.admin.onPressAdminOfficeAddress}
				/>
			);
		case "adminSealRegistration":
			return (
				<AdminSealRegistrationStepSection
					sealFileName={form.admin.sealFileName}
					agreeAll={form.agreements.agreeAll}
					agreePrivacy={form.agreements.agreePrivacy}
					agreeMarketing={form.agreements.agreeMarketing}
					onPressUpload={actions.admin.onPressAdminSealUpload}
					onToggleAll={actions.agreements.onToggleAgreeAll}
					onTogglePrivacy={actions.agreements.onToggleAgreePrivacy}
					onToggleMarketing={actions.agreements.onToggleAgreeMarketing}
				/>
			);
		case "partnerCompanyInfo":
			return (
				<PartnerCompanyInfoStepSection
					partnerCompanyName={form.partner.companyName}
					partnerOfficeAddress={
						findAddressOption(form.partner.officeAddressId)?.label ?? ""
					}
					partnerOfficeAddressDetail={form.partner.officeAddressDetail}
					onChangePartnerCompanyName={actions.partner.onChangePartnerCompanyName}
					onChangePartnerOfficeAddressDetail={
						actions.partner.onChangePartnerOfficeAddressDetail
					}
					onPressOfficeAddress={actions.partner.onPressPartnerOfficeAddress}
				/>
			);
		case "partnerBusinessRegistration":
			return (
				<PartnerBusinessRegistrationStepSection
					businessRegistrationFileName={
						form.partner.businessRegistrationFileName
					}
					agreeAll={form.agreements.agreeAll}
					agreePrivacy={form.agreements.agreePrivacy}
					agreeMarketing={form.agreements.agreeMarketing}
					onPressUpload={
						actions.partner.onPressPartnerBusinessRegistrationUpload
					}
					onToggleAll={actions.agreements.onToggleAgreeAll}
					onTogglePrivacy={actions.agreements.onToggleAgreePrivacy}
					onToggleMarketing={actions.agreements.onToggleAgreeMarketing}
				/>
			);
		case "complete":
			return <CompleteStepSection name={completeDisplayName} />;
		default: {
			const _exhaustive: never = step;
			return null;
		}
	}
}
