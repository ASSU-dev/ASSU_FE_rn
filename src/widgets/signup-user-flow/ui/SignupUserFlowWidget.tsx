import { FormProvider } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSignupFlowController } from "@/features/signup-user-flow/model/useSignupFlowController";
import {
	LoginFormScreen,
	LoginIntroScreen,
	SignupFlowUiProvider,
	SignupProgressBar,
	SignupStepContent,
} from "@/features/signup-user-flow/ui";
import { USaintAuthWebViewModal } from "@/features/signup-user-flow/ui/components/USaintAuthWebViewModal";
import { AddressSearchDialog } from "@/shared/ui/address-search";
import { BottomActionSheet } from "@/shared/ui/bottom-sheet";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";

// 상태바/홈 인디케이터 인셋 위에 얹는 여백 (iPhone 기준 기존 pt-[72px] / pb-[41px] 유지)
const TOP_CONTENT_OFFSET = 24;
const BOTTOM_CONTENT_OFFSET = 8;
const MIN_BOTTOM_INSET = 12;

export function SignupUserFlowWidget() {
	const insets = useSafeAreaInsets();
	const {
		formMethods,
		flow,
		login,
		flowUi,
		overlays,
		studentAuthWebView,
		loginWebView,
	} = useSignupFlowController();

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
			<>
				<LoginFormScreen
					email={login.email}
					password={login.password}
					onChangeEmail={login.onChangeEmail}
					onChangePassword={login.onChangePassword}
					onPressLogin={login.onPressLogin}
					isLoginPending={login.isLoginPending}
					onPressLmsLogin={login.onPressLmsLogin}
					onPressSignup={login.onPressSignup}
				/>
				<USaintAuthWebViewModal
					visible={loginWebView.visible}
					loginUrl={loginWebView.loginUrl}
					onClose={loginWebView.close}
					onVerifySuccess={loginWebView.onVerifySuccess}
				/>
			</>
		);
	}

	return (
		<FormProvider {...formMethods}>
			<SignupFlowUiProvider value={flowUi}>
				<View
					className="flex-1 bg-canvas px-screen-m"
					style={{
						paddingTop: insets.top + TOP_CONTENT_OFFSET,
						paddingBottom:
							Math.max(insets.bottom, MIN_BOTTOM_INSET) + BOTTOM_CONTENT_OFFSET,
					}}
				>
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
						<View className="w-full mt-[10px]">
							<MediumButton
								onPress={flow.onBottomButtonPress}
								disabled={flow.isBottomDisabled}
							>
								{flow.buttonLabel}
							</MediumButton>
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

					<USaintAuthWebViewModal
						visible={studentAuthWebView.visible}
						loginUrl={studentAuthWebView.loginUrl}
						onClose={studentAuthWebView.close}
						onVerifySuccess={studentAuthWebView.onVerifySuccess}
					/>

					<AddressSearchDialog
						visible={overlays.addressSearch.visible}
						items={overlays.addressSearch.items}
						query={overlays.addressSearch.query}
						isLoading={overlays.addressSearch.isLoading}
						selectedItemId={overlays.addressSearch.selectedItemId}
						onClose={overlays.addressSearch.close}
						onSelectItem={overlays.addressSearch.selectItem}
						onQueryChange={overlays.addressSearch.onQueryChange}
					/>
				</View>
			</SignupFlowUiProvider>
		</FormProvider>
	);
}
