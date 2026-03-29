import type {
	SignupFormState,
	SignupStep,
} from "@/features/signup-user-flow/model/types";
import { CompleteStepSection } from "./sections/CompleteStepSection";
import { IdentityStepSection } from "./sections/IdentityStepSection";
import { RoleStepSection } from "./sections/RoleStepSection";
import { SchoolStepSection } from "./sections/SchoolStepSection";
import { StudentAgreementStepSection } from "./sections/StudentAgreementStepSection";
import { StudentVerificationStepSection } from "./sections/StudentVerificationStepSection";

type SignupStepContentProps = {
	step: SignupStep;
	form: SignupFormState;
	countdown: string;
	isVerificationError: boolean;
	onChangePhone: (value: string) => void;
	onChangeVerificationCode: (value: string) => void;
	onSendCode: () => void;
	onPressInfoLink: () => void;
	onSelectRole: (role: NonNullable<SignupFormState["role"]>) => void;
	onSelectSchool: (school: NonNullable<SignupFormState["school"]>) => void;
	onPressStudentVerify: () => void;
	onToggleAgreeAll: () => void;
	onToggleAgreePrivacy: () => void;
	onToggleAgreeMarketing: () => void;
};

export function SignupStepContent({
	step,
	form,
	countdown,
	isVerificationError,
	onChangePhone,
	onChangeVerificationCode,
	onSendCode,
	onPressInfoLink,
	onSelectRole,
	onSelectSchool,
	onPressStudentVerify,
	onToggleAgreeAll,
	onToggleAgreePrivacy,
	onToggleAgreeMarketing,
}: SignupStepContentProps) {
	switch (step) {
		case "identity":
			return (
				<IdentityStepSection
					phone={form.phone}
					verificationCode={form.verificationCode}
					isCodeSent={form.isCodeSent}
					countdown={countdown}
					isVerificationError={isVerificationError}
					onChangePhone={onChangePhone}
					onChangeVerificationCode={onChangeVerificationCode}
					onSendCode={onSendCode}
					onPressInfoLink={onPressInfoLink}
				/>
			);
		case "role":
			return (
				<RoleStepSection selectedRole={form.role} onSelectRole={onSelectRole} />
			);
		case "school":
			return (
				<SchoolStepSection
					school={form.school}
					onSelectSchool={onSelectSchool}
				/>
			);
		case "studentInput1":
			return (
				<StudentVerificationStepSection
					school={form.school ?? "숭실대학교"}
					onPressVerify={onPressStudentVerify}
				/>
			);
		case "studentInput2":
		case "studentInput3":
			return (
				<StudentAgreementStepSection
					major={form.major}
					studentId={form.studentId}
					agreeAll={form.agreeAll}
					agreePrivacy={form.agreePrivacy}
					agreeMarketing={form.agreeMarketing}
					onToggleAll={onToggleAgreeAll}
					onTogglePrivacy={onToggleAgreePrivacy}
					onToggleMarketing={onToggleAgreeMarketing}
				/>
			);
		case "complete":
			return <CompleteStepSection name={form.name} />;
		default:
			return null;
	}
}
