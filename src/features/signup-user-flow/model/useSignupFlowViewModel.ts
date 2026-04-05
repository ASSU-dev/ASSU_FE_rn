import { router } from "expo-router";
import type { SignupStep } from "./types";

type UseSignupFlowViewModelParams = {
	step: SignupStep;
	progress: number;
	progressSteps: SignupStep[];
	currentProgressIndex: number;
	showProgress: boolean;
	showBottomButton: boolean;
	isBottomDisabled: boolean;
	buttonLabel: string;
	goTo: (step: SignupStep) => void;
	goNext: () => void;
};

export function useSignupFlowViewModel({
	step,
	progress,
	progressSteps,
	currentProgressIndex,
	showProgress,
	showBottomButton,
	isBottomDisabled,
	buttonLabel,
	goTo,
	goNext,
}: UseSignupFlowViewModelParams) {
	return {
		step,
		progress,
		progressSteps,
		currentProgressIndex,
		showProgress,
		showBottomButton,
		isBottomDisabled,
		buttonLabel,
		onSegmentPress: (segmentIndex: number) => {
			if (segmentIndex >= currentProgressIndex) {
				return;
			}

			goTo(progressSteps[segmentIndex]);
		},
		onBottomButtonPress:
			step === "complete"
				? () => router.replace("/(protected)/(student)/(tabs)/home")
				: goNext,
	};
}
