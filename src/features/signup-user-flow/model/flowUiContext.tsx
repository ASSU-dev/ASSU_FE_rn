import { createContext, type PropsWithChildren, useContext } from "react";
import type { SignupFormState, SignupStep } from "./types";

type IdentityActions = {
	onChangePhone: (value: string) => void;
	onChangeVerificationCode: (value: string) => void;
	onSendCode: () => void;
	onPressInfoLink: () => void;
};

type StudentActions = {
	onSelectRole: (role: NonNullable<SignupFormState["role"]>) => void;
	onSelectSchool: (
		school: NonNullable<SignupFormState["student"]["school"]>,
	) => void;
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

export type SignupFlowUiContextValue = {
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

const SignupFlowUiContext = createContext<SignupFlowUiContextValue | null>(
	null,
);

export function SignupFlowUiProvider({
	value,
	children,
}: PropsWithChildren<{ value: SignupFlowUiContextValue }>) {
	return (
		<SignupFlowUiContext.Provider value={value}>
			{children}
		</SignupFlowUiContext.Provider>
	);
}

export function useSignupFlowUi() {
	const context = useContext(SignupFlowUiContext);

	if (!context) {
		throw new Error("useSignupFlowUi must be used within SignupFlowUiProvider");
	}

	return context;
}
