import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
	SIGNUP_PROGRESS_STEPS,
	VERIFICATION_SUCCESS_CODE,
} from "@/features/signup-user-flow/model/constants";
import { useSignupUserFlow } from "@/features/signup-user-flow/model/useSignupUserFlow";
import {
	LoginFormScreen,
	LoginIntroScreen,
	SignupProgressBar,
	SignupStepContent,
} from "@/features/signup-user-flow/ui";
import { BottomActionSheet } from "@/shared/ui/bottom-sheet";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";

const BUTTON_LABEL_BY_STEP = {
	identity: "인증완료",
	role: "확인",
	school: "완료",
	studentInput2: "완료",
	studentInput3: "완료",
	complete: "가입완료",
} as const;

export function SignupUserFlowWidget() {
	const [isResendSheetVisible, setResendSheetVisible] = useState(false);
	const {
		step,
		form,
		progress,
		isCurrentStepValid,
		countdown,
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
	} = useSignupUserFlow();

	useEffect(() => {
		if (step !== "login1") {
			return;
		}

		const timer = setTimeout(() => {
			goTo("loginForm");
		}, 2000);
		return () => clearTimeout(timer);
	}, [goTo, step]);

	if (step === "login1") {
		return (
			<LoginIntroScreen
				showStatusBar
				showHomeIndicator
				onPress={() => {}}
				disabled
			/>
		);
	}

	if (step === "loginForm") {
		return (
			<LoginFormScreen
				email={form.email}
				password={form.password}
				onChangeEmail={setEmail}
				onChangePassword={setPassword}
				onPressLogin={() => {
					console.log("로그인 성공");
				}}
				onPressSignup={() => goTo("identity")}
			/>
		);
	}

	const currentProgressIndex = SIGNUP_PROGRESS_STEPS.indexOf(step);
	const showProgress = step !== "complete";
	const showBottomButton = step !== "studentInput1";
	const isBottomDisabled =
		step === "studentInput2"
			? true
			: !isCurrentStepValid && step !== "complete";
	const isVerificationError =
		form.verificationAttempted &&
		form.verificationCode !== VERIFICATION_SUCCESS_CODE;
	const buttonLabel =
		BUTTON_LABEL_BY_STEP[step as keyof typeof BUTTON_LABEL_BY_STEP] ?? "완료";
	const toggleAgreementAndActivate = (
		current: boolean,
		setter: (checked: boolean) => void,
		shouldActivate: (next: boolean) => boolean = (next) => next,
	) => {
		const next = !current;
		setter(next);
		if (shouldActivate(next)) {
			activateStudentInput3();
		}
	};
	const handleToggleAgreeAll = () => {
		toggleAgreementAndActivate(form.agreeAll, setAgreeAll);
	};
	const handleToggleAgreePrivacy = () => {
		toggleAgreementAndActivate(form.agreePrivacy, setAgreePrivacy);
	};
	const handleToggleAgreeMarketing = () => {
		toggleAgreementAndActivate(
			form.agreeMarketing,
			setAgreeMarketing,
			(next) => next && form.agreePrivacy,
		);
	};

	return (
		<View className="flex-1 bg-canvas px-screen-m pb-[8px] pt-[72px]">
			{showProgress ? (
				<SignupProgressBar
					progress={progress}
					segmentCount={SIGNUP_PROGRESS_STEPS.length}
					currentSegment={currentProgressIndex}
					onSegmentPress={(segmentIndex) => {
						if (segmentIndex >= currentProgressIndex) {
							return;
						}
						goTo(SIGNUP_PROGRESS_STEPS[segmentIndex]);
					}}
				/>
			) : null}

			<View
				className={
					step === "complete" ? "flex-1 items-center justify-center" : "flex-1"
				}
			>
				<SignupStepContent
					step={step}
					form={form}
					countdown={countdown}
					isVerificationError={isVerificationError}
					onChangePhone={setPhone}
					onChangeVerificationCode={setVerificationCode}
					onSendCode={sendVerificationCode}
					onPressInfoLink={() => setResendSheetVisible(true)}
					onSelectRole={setRole}
					onSelectSchool={setSchool}
					onPressStudentVerify={() => goTo("studentInput2")}
					onToggleAgreeAll={handleToggleAgreeAll}
					onToggleAgreePrivacy={handleToggleAgreePrivacy}
					onToggleAgreeMarketing={handleToggleAgreeMarketing}
				/>
			</View>

			{showBottomButton ? (
				<View className="items-center pb-[33px]">
					<View className={isBottomDisabled ? "opacity-disabled" : undefined}>
						<MediumButton
							onPress={
								step === "complete"
									? () => router.replace("/(protected)/student/(tabs)/home")
									: goNext
							}
							disabled={isBottomDisabled}
						>
							{buttonLabel}
						</MediumButton>
					</View>
				</View>
			) : null}

			<BottomActionSheet
				visible={isResendSheetVisible}
				title="인증번호를 받지 못하셨나요?"
				description="입력하신 번호가 맞는지 확인해주세요"
				actionLabel="재전송하기"
				onClose={() => setResendSheetVisible(false)}
				onAction={() => {
					sendVerificationCode();
					setResendSheetVisible(false);
				}}
			/>
		</View>
	);
}
