import { useCallback, useMemo, useState } from "react";
import {
	type Path,
	type PathValue,
	useForm,
} from "react-hook-form";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import {
	getSignupFlowConfig,
	getSignupFlowVariant,
	VERIFICATION_SUCCESS_CODE,
} from "./flowConfig";
import { DEFAULT_SIGNUP_FORM_STATE } from "./mock/signupUserFlow.mock";
import { useSignupFormActions } from "./useSignupFormActions";
import { isSignupStepValid } from "./validation";
import type {
	SignupFormState,
	SignupStep,
} from "./types";

type SignupObjectSectionKey = Exclude<keyof SignupFormState, "role">;

export function useSignupUserFlow() {
	const [step, setStep] = useState<SignupStep>("login1");
	const formMethods = useForm<SignupFormState>({
		mode: "onChange",
		defaultValues: DEFAULT_SIGNUP_FORM_STATE,
	});
	const { watch, setValue, getValues } = formMethods;
	const form = watch();
	const timer = useCountdownTimer({ initialSeconds: 300 });

	const updateForm = useCallback(
		(updater: (prev: SignupFormState) => SignupFormState) => {
			const nextForm = updater(getValues());
			(Object.keys(nextForm) as Array<keyof SignupFormState>).forEach((key) => {
				setValue(
					key as Path<SignupFormState>,
					nextForm[key] as PathValue<SignupFormState, Path<SignupFormState>>,
					{ shouldDirty: true, shouldValidate: true },
				);
			});
		},
		[getValues, setValue],
	);

	const updateSection = useCallback(
		<K extends SignupObjectSectionKey>(
			section: K,
			updater: (
				value: SignupFormState[K],
			) => SignupFormState[K],
		) => {
			const nextValue = updater(getValues(section as Path<SignupFormState>) as SignupFormState[K]);
			setValue(
				section as Path<SignupFormState>,
				nextValue as PathValue<SignupFormState, Path<SignupFormState>>,
				{ shouldDirty: true, shouldValidate: true },
			);
		},
		[getValues, setValue],
	);

	const setSectionField = useCallback(
		<K extends SignupObjectSectionKey, F extends keyof SignupFormState[K]>(
			section: K,
			field: F,
			value: SignupFormState[K][F],
		) => {
			setValue(
				`${String(section)}.${String(field)}` as Path<SignupFormState>,
				value as PathValue<SignupFormState, Path<SignupFormState>>,
				{ shouldDirty: true, shouldValidate: true },
			);
		},
		[setValue],
	);

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
				setSectionField("identity", "verificationAttempted", true);
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

	const actions = useSignupFormActions({
		updateForm,
		updateSection,
		setSectionField,
		startVerificationCountdown: timer.start,
	});

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
		formMethods,
		goTo,
		goNext,
		setAuthEmail: actions.auth.setEmail,
		setAuthPassword: actions.auth.setPassword,
		setPhone: actions.identity.setPhone,
		setVerificationCode: actions.identity.setVerificationCode,
		sendVerificationCode: actions.identity.sendVerificationCode,
		setRole: actions.student.setRole,
		setSchool: actions.student.setSchool,
		setPartnerEmail: actions.partner.setEmail,
		setPartnerPassword: actions.partner.setPassword,
		setAdminEmail: actions.admin.setEmail,
		setAdminPassword: actions.admin.setPassword,
		setAdminOrganizationType: actions.admin.setOrganizationType,
		setAdminCollege: actions.admin.setCollege,
		setAdminDepartment: actions.admin.setDepartment,
		setAdminOfficeAddress: actions.admin.setOfficeAddress,
		setAdminOfficeAddressDetail: actions.admin.setOfficeAddressDetail,
		selectAdminSealMock: actions.admin.selectSealMock,
		setPartnerCompanyName: actions.partner.setCompanyName,
		setPartnerOfficeAddress: actions.partner.setOfficeAddress,
		setPartnerOfficeAddressDetail: actions.partner.setOfficeAddressDetail,
		selectPartnerBusinessRegistrationMock:
			actions.partner.selectBusinessRegistrationMock,
		setAgreePrivacy: actions.agreements.setPrivacy,
		setAgreeMarketing: actions.agreements.setMarketing,
		setAgreeAll: actions.agreements.setAll,
		activateStudentInput3,
	};
}
