import { FormProvider } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { useSignupFlowController } from "@/features/signup-user-flow/model/useSignupFlowController";
import {
	LoginFormScreen,
	LoginIntroScreen,
	SignupFlowUiProvider,
	SignupProgressBar,
	SignupStepContent,
} from "@/features/signup-user-flow/ui";

import { AddressSearchDialog } from "@/shared/ui/address-search";
import { BottomActionSheet } from "@/shared/ui/bottom-sheet";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";

export function SignupUserFlowWidget() {
	const { formMethods, flow, login, flowUi, overlays } =
		useSignupFlowController();

	if (flow.step === "login1") {
		return (
			<LoginIntroScreen
				showStatusBar
				showHomeIndicator
				onPress={() => {}}
				disabled
			/>
		);
	}

	if (flow.step === "loginForm") {
		return (
			<LoginFormScreen
				email={login.email}
				password={login.password}
				onChangeEmail={login.onChangeEmail}
				onChangePassword={login.onChangePassword}
				onPressLogin={login.onPressLogin}
				onPressSignup={login.onPressSignup}
			/>
		);
	}

	return (
		<FormProvider {...formMethods}>
			<SignupFlowUiProvider value={flowUi}>
				<View className="flex-1 bg-canvas px-screen-m pb-[8px] pt-[72px]">
					<ScrollView
						className="flex-1"
						contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
					>
						{flow.showProgress ? (
							<SignupProgressBar
								progress={flow.progress}
								segmentCount={flow.progressSteps.length}
								currentSegment={flow.currentProgressIndex}
								onSegmentPress={flow.onSegmentPress}
							/>
						) : null}

						<View
							className={
								flow.step === "complete"
									? "flex-1 items-center justify-center"
									: "flex-1"
							}
						>
							<SignupStepContent step={flow.step} />
						</View>
					</ScrollView>

					{flow.showBottomButton ? (
						<View className="items-center pb-[33px] mt-[10px]">
							<View
								className={
									flow.isBottomDisabled ? "opacity-disabled" : undefined
								}
							>
								<MediumButton
									onPress={flow.onBottomButtonPress}
									disabled={flow.isBottomDisabled}
								>
									{flow.buttonLabel}
								</MediumButton>
							</View>
						</View>
					) : null}

					<BottomActionSheet
						visible={overlays.resendSheet.visible}
						title="인증번호를 받지 못하셨나요?"
						description="입력하신 번호가 맞는지 확인해주세요"
						actionLabel="재전송하기"
						onClose={overlays.resendSheet.close}
						onAction={overlays.resendSheet.action}
					/>

					<AddressSearchDialog
						visible={overlays.addressSearch.visible}
						items={overlays.addressSearch.items}
						selectedItemId={overlays.addressSearch.selectedItemId}
						onClose={overlays.addressSearch.close}
						onSelectItem={overlays.addressSearch.selectItem}
					/>
				</View>
			</SignupFlowUiProvider>
		</FormProvider>
	);
}
