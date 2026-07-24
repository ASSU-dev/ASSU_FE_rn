import { useCallback, useMemo, useState } from "react";
import { type Path, type PathValue, useForm } from "react-hook-form";
import type { SignupSchool } from "@/entities/signup";
import { USER_TYPE, type UserType } from "@/entities/user/model/types";
import type { AddressSearchItem } from "@/shared/ui/address-search";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { findAdminCollegeOption, findAdminDepartmentOption } from "./admin";
import { getNextAgreementState } from "./agreements";
import {
	getSignupFlowConfig,
	getSignupFlowVariant,
	VERIFICATION_SUCCESS_CODE,
} from "./flowConfig";
import { DEFAULT_SIGNUP_FORM_STATE } from "./mock/signupUserFlow.mock";
import type {
	SignupAdminOrganizationType,
	SignupFormState,
	SignupIdentityFormState,
	SignupStep,
} from "./types";
import { isSignupStepValid } from "./validation";

type SignupObjectSectionKey = Exclude<keyof SignupFormState, "role">;

function resetVerificationAttempt(
	identity: SignupIdentityFormState,
	verificationCode: string,
) {
	return {
		...identity,
		verificationCode,
		verificationAttempted: false,
	};
}

export function useSignupUserFlow() {
	const [step, setStep] = useState<SignupStep>("login1");
	const formMethods = useForm<SignupFormState>({
		mode: "onChange",
		defaultValues: DEFAULT_SIGNUP_FORM_STATE,
	});
	const { watch, setValue, getValues, resetField } = formMethods;
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
			updater: (value: SignupFormState[K]) => SignupFormState[K],
		) => {
			const nextValue = updater(
				getValues(section as Path<SignupFormState>) as SignupFormState[K],
			);
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

	const flowVariant = useMemo(
		() => getSignupFlowVariant(form.role),
		[form.role],
	);
	const flowConfig = useMemo(
		() => getSignupFlowConfig(flowVariant),
		[flowVariant],
	);

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

	const setAuthEmail = (email: string) =>
		setSectionField("auth", "email", email);
	const setAuthPassword = (password: string) =>
		setSectionField("auth", "password", password);

	const setPhone = (phone: string) =>
		setSectionField("identity", "phone", phone);
	const setVerificationCode = (verificationCode: string) => {
		updateSection("identity", (identity) =>
			resetVerificationAttempt(identity, verificationCode),
		);
	};
	const sendVerificationCode = () => {
		updateSection("identity", (identity) => ({
			...identity,
			isCodeSent: true,
			verificationAttempted: false,
		}));
		timer.start();
	};

	const setRole = (role: UserType) =>
		updateForm((prev) => ({
			...prev,
			role,
			student:
				role === USER_TYPE.STUDENT
					? prev.student
					: DEFAULT_SIGNUP_FORM_STATE.student,
			partner:
				role === USER_TYPE.PARTNER
					? prev.partner
					: DEFAULT_SIGNUP_FORM_STATE.partner,
			admin:
				role === USER_TYPE.ADMIN ? prev.admin : DEFAULT_SIGNUP_FORM_STATE.admin,
			agreements: DEFAULT_SIGNUP_FORM_STATE.agreements,
		}));
	const setSchool = (school: SignupSchool) =>
		setSectionField("student", "school", school);
	const setStudentMajor = (major: string) =>
		setSectionField("student", "major", major);
	const setStudentId = (studentId: string) =>
		setSectionField("student", "studentId", studentId);
	const setProfileName = (name: string) =>
		setSectionField("profile", "name", name);
	const setIdentityVerified = () =>
		setSectionField("identity", "verificationCode", VERIFICATION_SUCCESS_CODE);

	const setPartnerEmail = (email: string) =>
		setSectionField("partner", "email", email);
	const setPartnerPassword = (password: string) =>
		setSectionField("partner", "password", password);
	const setPartnerCompanyName = (companyName: string) =>
		setSectionField("partner", "companyName", companyName);
	const setPartnerOfficeAddress = ({ id }: AddressSearchItem) =>
		setSectionField("partner", "officeAddressId", id);
	const setPartnerOfficeAddressDetail = (officeAddressDetail: string) =>
		setSectionField("partner", "officeAddressDetail", officeAddressDetail);
	const selectPartnerBusinessRegistrationMock = () =>
		setSectionField(
			"partner",
			"businessRegistrationFileName",
			"사업자등록증.jpg",
		);

	const setAdminEmail = (email: string) =>
		setSectionField("admin", "email", email);
	const setAdminPassword = (password: string) =>
		setSectionField("admin", "password", password);
	const setAdminOrganizationType = (
		_organizationType: SignupAdminOrganizationType | null,
	) => {
		// The organization type itself is controlled by the form field change.
		// Here we only reset dependent fields.
		resetField("admin.collegeId", { defaultValue: null });
		resetField("admin.departmentId", { defaultValue: null });
		resetField("admin.officeAddressId", { defaultValue: null });
		resetField("admin.officeAddressDetail", { defaultValue: "" });
		resetField("admin.sealFileName", { defaultValue: "" });
	};
	const setAdminCollege = (value: string | null) => {
		const selectedCollege = findAdminCollegeOption(value);
		setSectionField("admin", "collegeId", selectedCollege?.value ?? null);
		resetField("admin.departmentId", { defaultValue: null });
	};
	const setAdminDepartment = (value: string | null) => {
		const selectedDepartment = findAdminDepartmentOption(value);
		setSectionField("admin", "departmentId", selectedDepartment?.value ?? null);
	};
	const setAdminOfficeAddress = ({ id }: AddressSearchItem) =>
		setSectionField("admin", "officeAddressId", id);
	const setAdminOfficeAddressDetail = (officeAddressDetail: string) =>
		setSectionField("admin", "officeAddressDetail", officeAddressDetail);
	const selectAdminSealMock = () =>
		setSectionField("admin", "sealFileName", "인감등록.jpg");

	const setAgreePrivacy = (checked: boolean) => {
		updateSection("agreements", (agreements) =>
			getNextAgreementState(agreements, { agreePrivacy: checked }),
		);
	};
	const setAgreeMarketing = (checked: boolean) => {
		updateSection("agreements", (agreements) =>
			getNextAgreementState(agreements, { agreeMarketing: checked }),
		);
	};
	const setAgreeAll = (checked: boolean) => {
		updateSection("agreements", () => ({
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
		flowVariant,
		flowConfig,
		progress,
		isCurrentStepValid,
		countdown: timer.mmss,
		isCountdownExpired: form.identity.isCodeSent && timer.secondsLeft === 0,
		formMethods,
		goTo,
		goNext,
		setAuthEmail,
		setAuthPassword,
		setPhone,
		setVerificationCode,
		sendVerificationCode,
		setRole,
		setSchool,
		setStudentMajor,
		setStudentId,
		setProfileName,
		setIdentityVerified,
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
