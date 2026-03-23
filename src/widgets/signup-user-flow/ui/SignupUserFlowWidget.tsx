import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import {
	SIGNUP_PROGRESS_STEPS,
	VERIFICATION_SUCCESS_CODE,
} from "@/features/signup-user-flow/model/constants";
import { useSignupUserFlow } from "@/features/signup-user-flow/model/useSignupUserFlow";
import {
	CompleteStepSection,
	IdentityStepSection,
	LoginFormScreen,
	LoginIntroScreen,
	RoleStepSection,
	SchoolStepSection,
	SignupProgressBar,
	StudentAgreementStepSection,
	StudentVerificationStepSection,
} from "@/features/signup-user-flow/ui";
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
	const {
		step,
		form,
		progress,
		isCurrentStepValid,
		countdown,
		goTo,
		goNext,
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
				{step === "identity" ? (
					<IdentityStepSection
						phone={form.phone}
						verificationCode={form.verificationCode}
						isCodeSent={form.isCodeSent}
						countdown={countdown}
						isVerificationError={isVerificationError}
						onChangePhone={setPhone}
						onChangeVerificationCode={setVerificationCode}
						onSendCode={sendVerificationCode}
					/>
				) : null}

				{step === "role" ? (
					<RoleStepSection selectedRole={form.role} onSelectRole={setRole} />
				) : null}

				{step === "school" ? (
					<SchoolStepSection school={form.school} onSelectSchool={setSchool} />
				) : null}

				{step === "studentInput1" ? (
					<StudentVerificationStepSection
						school={form.school ?? "숭실대학교"}
						onPressVerify={() => goTo("studentInput2")}
					/>
				) : null}

				{step === "studentInput2" || step === "studentInput3" ? (
					<StudentAgreementStepSection
						major={form.major}
						studentId={form.studentId}
						agreeAll={form.agreeAll}
						agreePrivacy={form.agreePrivacy}
						agreeMarketing={form.agreeMarketing}
						onToggleAll={() => {
							const next = !form.agreeAll;
							setAgreeAll(next);
							if (next) {
								activateStudentInput3();
							}
						}}
						onTogglePrivacy={() => {
							const nextPrivacy = !form.agreePrivacy;
							setAgreePrivacy(nextPrivacy);
							if (nextPrivacy) {
								activateStudentInput3();
							}
						}}
						onToggleMarketing={() => {
							const nextMarketing = !form.agreeMarketing;
							setAgreeMarketing(nextMarketing);
							if (nextMarketing && form.agreePrivacy) {
								activateStudentInput3();
							}
						}}
					/>
				) : null}

				{step === "complete" ? <CompleteStepSection name={form.name} /> : null}
			</View>

			{showBottomButton ? (
				<View className="items-center pb-[33px]">
					<View className={isBottomDisabled ? "opacity-disabled" : undefined}>
						<MediumButton
							onPress={
								step === "complete"
									? () => router.replace("/(protected)/(student)/(tabs)/home")
									: goNext
							}
							disabled={isBottomDisabled}
						>
							{buttonLabel}
						</MediumButton>
					</View>
				</View>
			) : null}
		</View>
	);
}
