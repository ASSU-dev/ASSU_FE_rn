import { useFormContext, useWatch } from "react-hook-form";
import { useSignupFlowUi } from "../model/flowUiContext";
import type { SignupFormState, SignupStep } from "../model/types";
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

type SignupStepContentProps = {
	step: SignupStep;
};

export function SignupStepContent({ step }: SignupStepContentProps) {
	const { control } = useFormContext<SignupFormState>();
	const { countdown, completeDisplayName, isVerificationError, actions } =
		useSignupFlowUi();
	const form = useWatch({ control }) as SignupFormState;

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
				<SchoolStepSection onSelectSchool={actions.student.onSelectSchool} />
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
					onChangeOrganizationType={actions.admin.onChangeAdminOrganizationType}
				/>
			);
		case "adminOrganizationInfo":
			return (
				<AdminOrganizationInfoStepSection
					officeAddress={form.admin.officeAddress}
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
					partnerOfficeAddress={form.partner.officeAddress}
					partnerOfficeAddressDetail={form.partner.officeAddressDetail}
					onChangePartnerCompanyName={
						actions.partner.onChangePartnerCompanyName
					}
					onChangePartnerOfficeAddressDetail={
						actions.partner.onChangePartnerOfficeAddressDetail
					}
					onPressOfficeAddress={actions.partner.onPressPartnerOfficeAddress}
				/>
			);
		case "partnerBusinessRegistration":
			return (
				<PartnerBusinessRegistrationStepSection
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
