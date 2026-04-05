import { useMemo, useState } from "react";
import type { SignupSchool } from "@/entities/signup";
import type { UserType } from "@/entities/user/model/types";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { getNextAgreementState } from "./agreements";
import {
	findAdminCollegeOption,
	findAdminDepartmentOption,
} from "./admin";
import {
	getSignupFlowConfig,
	getSignupFlowVariant,
	VERIFICATION_SUCCESS_CODE,
} from "./flowConfig";
import { DEFAULT_SIGNUP_FORM_STATE } from "./mock/signupUserFlow.mock";
import { isSignupStepValid } from "./validation";
import type {
	SignupAdminOrganizationType,
	SignupFormState,
	SignupStep,
} from "./types";

export function useSignupUserFlow() {
	const [step, setStep] = useState<SignupStep>("login1");
	const [form, setForm] = useState<SignupFormState>(DEFAULT_SIGNUP_FORM_STATE);
	const timer = useCountdownTimer({ initialSeconds: 300 });

	const flowVariant = useMemo(() => getSignupFlowVariant(form.role), [form.role]);
	const flowConfig = useMemo(() => getSignupFlowConfig(flowVariant), [flowVariant]);

	const progress = useMemo(
		() => flowConfig.progressByStep[step] ?? 0,
		[flowConfig.progressByStep, step],
	);

	const isCurrentStepValid = useMemo(
		() => isSignupStepValid({ step, form, secondsLeft: timer.secondsLeft }),
		[form, step, timer.secondsLeft],
	);

	const goTo = (nextStep: SignupStep) => {
		setStep(nextStep);
	};

	const goNext = () => {
		if (step === "identity") {
			if (!isCurrentStepValid) {
				return;
			}
			if (form.identity.verificationCode !== VERIFICATION_SUCCESS_CODE) {
				setForm((prev) => ({
					...prev,
					identity: {
						...prev.identity,
						verificationAttempted: true,
					},
				}));
				return;
			}
		}

		const currentIndex = flowConfig.stepOrder.indexOf(step);
		const nextStep = flowConfig.stepOrder[currentIndex + 1];
		if (!nextStep || !isCurrentStepValid) {
			return;
		}

		setStep(nextStep);
	};

	const setAuthEmail = (email: string) => {
		setForm((prev) => ({ ...prev, auth: { ...prev.auth, email } }));
	};

	const setAuthPassword = (password: string) => {
		setForm((prev) => ({ ...prev, auth: { ...prev.auth, password } }));
	};

	const setPhone = (phone: string) => {
		setForm((prev) => ({
			...prev,
			identity: { ...prev.identity, phone },
		}));
	};

	const setVerificationCode = (verificationCode: string) => {
		setForm((prev) => ({
			...prev,
			identity: {
				...prev.identity,
				verificationCode,
				verificationAttempted: false,
			},
		}));
	};

	const sendVerificationCode = () => {
		setForm((prev) => ({
			...prev,
			identity: {
				...prev.identity,
				isCodeSent: true,
				verificationAttempted: false,
			},
		}));
		timer.start();
	};

	const setRole = (role: UserType) => {
		setForm((prev) => ({ ...prev, role }));
	};

	const setSchool = (school: SignupSchool) => {
		setForm((prev) => ({
			...prev,
			student: { ...prev.student, school },
		}));
	};

	const setPartnerEmail = (email: string) => {
		setForm((prev) => ({
			...prev,
			partner: { ...prev.partner, email },
		}));
	};

	const setPartnerPassword = (password: string) => {
		setForm((prev) => ({
			...prev,
			partner: { ...prev.partner, password },
		}));
	};

	const setAdminEmail = (email: string) => {
		setForm((prev) => ({
			...prev,
			admin: { ...prev.admin, email },
		}));
	};

	const setAdminPassword = (password: string) => {
		setForm((prev) => ({
			...prev,
			admin: { ...prev.admin, password },
		}));
	};

	const setAdminOrganizationType = (
		organizationType: SignupAdminOrganizationType | null,
	) => {
		setForm((prev) => ({
			...prev,
			admin: {
				...prev.admin,
				organizationType,
				collegeId: null,
				collegeName: "",
				departmentId: null,
				departmentName: "",
				officeAddressId: null,
				officeAddress: "",
				officeAddressDetail: "",
				sealFileName: "",
			},
		}));
	};

	const setAdminCollege = (value: string | null) => {
		const selectedCollege = findAdminCollegeOption(value);

		setForm((prev) => ({
			...prev,
			admin: {
				...prev.admin,
				collegeId: selectedCollege?.value ?? null,
				collegeName: selectedCollege?.label ?? "",
				departmentId: null,
				departmentName: "",
			},
		}));
	};

	const setAdminDepartment = (value: string | null) => {
		const selectedDepartment = findAdminDepartmentOption(value);

		setForm((prev) => ({
			...prev,
			admin: {
				...prev.admin,
				departmentId: selectedDepartment?.value ?? null,
				departmentName: selectedDepartment?.label ?? "",
			},
		}));
	};

	const setAdminOfficeAddress = ({
		id,
		label,
	}: {
		id: string;
		label: string;
	}) => {
		setForm((prev) => ({
			...prev,
			admin: {
				...prev.admin,
				officeAddressId: id,
				officeAddress: label,
			},
		}));
	};

	const setAdminOfficeAddressDetail = (officeAddressDetail: string) => {
		setForm((prev) => ({
			...prev,
			admin: { ...prev.admin, officeAddressDetail },
		}));
	};

	const selectAdminSealMock = () => {
		setForm((prev) => ({
			...prev,
			admin: {
				...prev.admin,
				sealFileName: "IMG.127",
			},
		}));
	};

	const setPartnerCompanyName = (companyName: string) => {
		setForm((prev) => ({
			...prev,
			partner: { ...prev.partner, companyName },
		}));
	};

	const setPartnerOfficeAddress = ({
		id,
		label,
	}: {
		id: string;
		label: string;
	}) => {
		setForm((prev) => ({
			...prev,
			partner: {
				...prev.partner,
				officeAddressId: id,
				officeAddress: label,
			},
		}));
	};

	const setPartnerOfficeAddressDetail = (officeAddressDetail: string) => {
		setForm((prev) => ({
			...prev,
			partner: { ...prev.partner, officeAddressDetail },
		}));
	};

	const selectPartnerBusinessRegistrationMock = () => {
		setForm((prev) => ({
			...prev,
			partner: {
				...prev.partner,
				businessRegistrationFileName: "사업자등록증.jpg",
			},
		}));
	};

	const setAgreePrivacy = (checked: boolean) => {
		setForm((prev) => ({
			...prev,
			agreements: getNextAgreementState(prev.agreements, {
				agreePrivacy: checked,
			}),
		}));
	};

	const setAgreeMarketing = (checked: boolean) => {
		setForm((prev) => ({
			...prev,
			agreements: getNextAgreementState(prev.agreements, {
				agreeMarketing: checked,
			}),
		}));
	};

	const setAgreeAll = (checked: boolean) => {
		setForm((prev) => ({
			...prev,
			agreements: {
				agreeAll: checked,
				agreePrivacy: checked,
				agreeMarketing: checked,
			},
		}));
	};

	const activateStudentInput3 = () => {
		setStep("studentInput3");
	};

	return {
		step,
		form,
		flowVariant,
		flowConfig,
		progress,
		isCurrentStepValid,
		countdown: timer.mmss,
		isCountdownExpired: form.identity.isCodeSent && timer.secondsLeft === 0,
		goTo,
		goNext,
		setAuthEmail,
		setAuthPassword,
		setPhone,
		setVerificationCode,
		sendVerificationCode,
		setRole,
		setSchool,
		setPartnerEmail,
		setPartnerPassword,
		setAdminEmail,
		setAdminPassword,
		setAdminOrganizationType,
		setAdminCollege,
		setAdminDepartment,
		setAdminOfficeAddress,
		setAdminOfficeAddressDetail,
		selectAdminSealMock,
		setPartnerCompanyName,
		setPartnerOfficeAddress,
		setPartnerOfficeAddressDetail,
		selectPartnerBusinessRegistrationMock,
		setAgreePrivacy,
		setAgreeMarketing,
		setAgreeAll,
		activateStudentInput3,
	};
}
