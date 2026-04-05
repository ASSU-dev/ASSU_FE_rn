import { PARTNER_ADDRESS_OPTIONS } from "@/features/signup-user-flow/model/data/partnerAddressOptions";
import type { SignupAdminOrganizationType } from "@/features/signup-user-flow/model/types";
import { useSignupFlowPresentation } from "@/features/signup-user-flow/model/useSignupFlowPresentation";
import {
  LoginFormScreen,
  LoginIntroScreen,
  SignupProgressBar,
  SignupStepContent,
} from "@/features/signup-user-flow/ui";
import { AddressSearchDialog } from "@/shared/ui/address-search";
import { BottomActionSheet } from "@/shared/ui/bottom-sheet";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

export function SignupUserFlowWidget() {
  const [isResendSheetVisible, setResendSheetVisible] = useState(false);
  const [isAddressSearchVisible, setAddressSearchVisible] = useState(false);
  const [addressSearchTarget, setAddressSearchTarget] = useState<
    "partner" | "admin" | null
  >(null);
  const {
    step,
    form,
    progress,
    countdown,
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
    progressSteps,
    currentProgressIndex,
    showProgress,
    showBottomButton,
    isBottomDisabled,
    isVerificationError,
    buttonLabel,
    completeDisplayName,
    agreementHandlers,
  } = useSignupFlowPresentation();

  const stepContentActions = useMemo(
    () => ({
      identity: {
        onChangePhone: setPhone,
        onChangeVerificationCode: setVerificationCode,
        onSendCode: sendVerificationCode,
        onPressInfoLink: () => setResendSheetVisible(true),
      },
      student: {
        onSelectRole: setRole,
        onSelectSchool: setSchool,
        onPressStudentVerify: () => goTo("studentInput2"),
      },
      partner: {
        onChangePartnerEmail: setPartnerEmail,
        onChangePartnerPassword: setPartnerPassword,
        onChangePartnerCompanyName: setPartnerCompanyName,
        onChangePartnerOfficeAddressDetail: setPartnerOfficeAddressDetail,
        onPressPartnerOfficeAddress: () => {
          setAddressSearchTarget("partner");
          setAddressSearchVisible(true);
        },
        onPressPartnerBusinessRegistrationUpload:
          selectPartnerBusinessRegistrationMock,
      },
      admin: {
        onChangeAdminEmail: setAdminEmail,
        onChangeAdminPassword: setAdminPassword,
        onChangeAdminOrganizationType: (
          value: SignupAdminOrganizationType | null,
        ) => {
          setAdminOrganizationType(value);
          if (step === "adminOrganizationType" && value) {
            goTo("adminOrganizationInfo");
          }
        },
        onChangeAdminCollege: setAdminCollege,
        onChangeAdminDepartment: setAdminDepartment,
        onChangeAdminOfficeAddressDetail: setAdminOfficeAddressDetail,
        onPressAdminOfficeAddress: () => {
          setAddressSearchTarget("admin");
          setAddressSearchVisible(true);
        },
        onPressAdminSealUpload: selectAdminSealMock,
      },
      agreements: agreementHandlers,
    }),
    [
      agreementHandlers,
      goTo,
      selectAdminSealMock,
      selectPartnerBusinessRegistrationMock,
      sendVerificationCode,
      setAdminEmail,
      setAdminCollege,
      setAdminDepartment,
      setAdminOfficeAddressDetail,
      setAdminOrganizationType,
      setAdminPassword,
      setPartnerCompanyName,
      setPartnerEmail,
      setPartnerOfficeAddressDetail,
      setPartnerPassword,
      setPhone,
      setRole,
      setSchool,
      setVerificationCode,
      step,
    ],
  );

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
        email={form.auth.email}
        password={form.auth.password}
        onChangeEmail={setAuthEmail}
        onChangePassword={setAuthPassword}
        onPressLogin={() => {}}
        onPressSignup={() => goTo("identity")}
      />
    );
  }

  return (
    <View className="flex-1 bg-canvas px-screen-m pb-[8px] pt-[72px]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {showProgress ? (
          <SignupProgressBar
            progress={progress}
            segmentCount={progressSteps.length}
            currentSegment={currentProgressIndex}
            onSegmentPress={(segmentIndex) => {
              if (segmentIndex >= currentProgressIndex) {
                return;
              }
              goTo(progressSteps[segmentIndex]);
            }}
          />
        ) : null}

        <View
          className={
            step === "complete"
              ? "flex-1 items-center justify-center"
              : "flex-1"
          }
        >
          <SignupStepContent
            step={step}
            form={form}
            countdown={countdown}
            completeDisplayName={completeDisplayName}
            isVerificationError={isVerificationError}
            actions={stepContentActions}
          />
        </View>
      </ScrollView>

      {showBottomButton ? (
        <View className="items-center pb-[33px] mt-[10px]">
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

      <AddressSearchDialog
        visible={isAddressSearchVisible}
        items={PARTNER_ADDRESS_OPTIONS}
        selectedItemId={
          addressSearchTarget === "admin"
            ? form.admin.officeAddressId
            : form.partner.officeAddressId
        }
        onClose={() => {
          setAddressSearchVisible(false);
          setAddressSearchTarget(null);
        }}
        onSelectItem={(item) => {
          if (addressSearchTarget === "admin") {
            setAdminOfficeAddress(item);
          } else {
            setPartnerOfficeAddress(item);
          }
          setAddressSearchVisible(false);
          setAddressSearchTarget(null);
        }}
      />
    </View>
  );
}
