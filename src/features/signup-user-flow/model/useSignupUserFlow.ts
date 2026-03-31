import { useMemo, useState } from "react";
import type { SignupSchool } from "@/entities/signup";
import type { UserType } from "@/entities/user/model/types";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { VERIFICATION_SUCCESS_CODE } from "./constants";
import { DEFAULT_SIGNUP_FORM_STATE } from "./mock/signupUserFlow.mock";
import type { SignupFormState, SignupStep } from "./types";

const STEP_ORDER: SignupStep[] = [
	"login1",
	"loginForm",
	"identity",
	"role",
	"school",
	"studentInput1",
	"studentInput2",
	"studentInput3",
	"complete",
];

export function useSignupUserFlow() {
	const [step, setStep] = useState<SignupStep>("login1");
	const [form, setForm] = useState<SignupFormState>(DEFAULT_SIGNUP_FORM_STATE);
	const timer = useCountdownTimer({ initialSeconds: 300 });

	const progress = useMemo(() => {
		switch (step) {
			case "identity":
				return 16.67;
			case "role":
				return 50;
			case "school":
				return 66.67;
			case "studentInput1":
			case "studentInput2":
			case "studentInput3":
				return 83.33;
			default:
				return 0;
		}
	}, [step]);

	const isCurrentStepValid = useMemo(() => {
		switch (step) {
			case "identity":
				return (
					form.phone.length > 0 &&
					form.verificationCode.length > 0 &&
					form.isCodeSent &&
					timer.secondsLeft > 0
				);
			case "role":
				return Boolean(form.role);
			case "school":
				return Boolean(form.school);
			case "studentInput2":
			case "studentInput3":
				return form.agreePrivacy;
			default:
				return true;
		}
	}, [form, step, timer.secondsLeft]);

	const goTo = (nextStep: SignupStep) => {
		setStep(nextStep);
	};

	const goNext = () => {
		if (step === "identity") {
			if (!isCurrentStepValid) {
				return;
			}
			if (form.verificationCode !== VERIFICATION_SUCCESS_CODE) {
				setForm((prev) => ({ ...prev, verificationAttempted: true }));
				return;
			}
		}

		const currentIndex = STEP_ORDER.indexOf(step);
		const nextStep = STEP_ORDER[currentIndex + 1];
		if (!nextStep) {
			return;
		}

		if (!isCurrentStepValid) {
			return;
		}

		setStep(nextStep);
	};

	const setPhone = (phone: string) => {
		setForm((prev) => ({ ...prev, phone }));
	};

	const setEmail = (email: string) => {
		setForm((prev) => ({ ...prev, email }));
	};

	const setPassword = (password: string) => {
		setForm((prev) => ({ ...prev, password }));
	};

	const setVerificationCode = (verificationCode: string) => {
		setForm((prev) => ({
			...prev,
			verificationCode,
			verificationAttempted: false,
		}));
	};

	const sendVerificationCode = () => {
		setForm((prev) => ({
			...prev,
			isCodeSent: true,
			verificationAttempted: false,
		}));
		timer.start();
	};

	const setRole = (role: UserType) => {
		setForm((prev) => ({ ...prev, role }));
	};

	const setSchool = (school: SignupSchool) => {
		setForm((prev) => ({ ...prev, school }));
	};

	const setAgreementState = (
		updater: (prev: SignupFormState) => Partial<SignupFormState>,
	) => {
		setForm((prev) => {
			const partial = updater(prev);
			const next = { ...prev, ...partial };
			return {
				...next,
				agreeAll: next.agreePrivacy && next.agreeMarketing,
			};
		});
	};

	const setAgreePrivacy = (checked: boolean) => {
		setAgreementState(() => ({ agreePrivacy: checked }));
	};

	const setAgreeMarketing = (checked: boolean) => {
		setAgreementState(() => ({ agreeMarketing: checked }));
	};

	const setAgreeAll = (checked: boolean) => {
		setForm((prev) => ({
			...prev,
			agreeAll: checked,
			agreePrivacy: checked,
			agreeMarketing: checked,
		}));
	};

	const activateStudentInput3 = () => {
		setStep("studentInput3");
	};

	return {
		step,
		form,
		progress,
		isCurrentStepValid,
		countdown: timer.mmss,
		isCountdownExpired: form.isCodeSent && timer.secondsLeft === 0,
		goTo,
		goNext,
		setEmail,
		setPassword,
		setPhone,
		setVerificationCode,
		sendVerificationCode,
		setRole,
		setSchool,
		setAgreePrivacy,
		setAgreeMarketing,
		setAgreeAll,
		activateStudentInput3,
	};
}
