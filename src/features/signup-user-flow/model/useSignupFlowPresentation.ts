import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { USER_TYPE } from "@/entities/user/model/types";
import { getAdminCompletionName } from "./admin";
import { useSignupUserFlow } from "./useSignupUserFlow";

export function useSignupFlowPresentation() {
	const flow = useSignupUserFlow();
	const {
		step,
		form,
		flowConfig,
		goTo,
		isCurrentStepValid,
		setAgreeAll,
		setAgreePrivacy,
		setAgreeMarketing,
		activateStudentInput3,
	} = flow;

	useEffect(() => {
		if (step !== "login1") {
			return;
		}

		const timer = setTimeout(() => {
			goTo("loginForm");
		}, 2000);

		return () => clearTimeout(timer);
	}, [goTo, step]);

	useEffect(() => {
		if (step !== "complete") {
			return;
		}

		const timer = setTimeout(() => {
			router.replace("/(auth)/register");
		}, 2000);

		return () => clearTimeout(timer);
	}, [step]);

	const progressSteps = flowConfig.progressSteps;
	const currentProgressIndex = progressSteps.indexOf(step);
	const showProgress = step !== "complete";
	const showBottomButton = step !== "studentInput1" && step !== "complete";
	const isBottomDisabled =
		step === "studentInput2"
			? true
			: !isCurrentStepValid && step !== "complete";
	// 서버 검증 실패 시에만 true. 코드를 다시 입력하면 해제된다
	const isVerificationError = form.identity.verificationAttempted;
	const buttonLabel = flowConfig.buttonLabelByStep[step] ?? "완료";
	const completeDisplayName = useMemo(() => {
		if (form.role === USER_TYPE.PARTNER) {
			return form.partner.companyName || form.profile.name;
		}

		if (form.role === USER_TYPE.ADMIN) {
			return getAdminCompletionName(form.admin) || form.profile.name;
		}

		return form.profile.name;
	}, [form.admin, form.partner.companyName, form.profile.name, form.role]);

	const agreementHandlers = useMemo(() => {
		const toggleAgreementAndActivate = (
			current: boolean,
			setter: (checked: boolean) => void,
			shouldActivate: (next: boolean) => boolean = (next) => next,
		) => {
			const next = !current;
			setter(next);
			if (step === "studentInput2" && shouldActivate(next)) {
				activateStudentInput3();
			}
		};

		return {
			onToggleAgreeAll: () => {
				toggleAgreementAndActivate(form.agreements.agreeAll, setAgreeAll);
			},
			onToggleAgreePrivacy: () => {
				toggleAgreementAndActivate(
					form.agreements.agreePrivacy,
					setAgreePrivacy,
				);
			},
			onToggleAgreeMarketing: () => {
				toggleAgreementAndActivate(
					form.agreements.agreeMarketing,
					setAgreeMarketing,
					(next) => next && form.agreements.agreePrivacy,
				);
			},
		};
	}, [
		activateStudentInput3,
		form.agreements.agreeAll,
		form.agreements.agreeMarketing,
		form.agreements.agreePrivacy,
		setAgreeAll,
		setAgreeMarketing,
		setAgreePrivacy,
		step,
	]);

	return {
		...flow,
		progressSteps,
		currentProgressIndex,
		showProgress,
		showBottomButton,
		isBottomDisabled,
		isVerificationError,
		buttonLabel,
		completeDisplayName,
		agreementHandlers,
	};
}
