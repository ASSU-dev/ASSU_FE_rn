import { View } from "react-native";
import { SignupStepTitle } from "../SignupStepTitle";
import { AgreementFooter } from "../components/AgreementFooter";
import { FileUploadButton } from "../components/FileUploadButton";

type PartnerBusinessRegistrationStepSectionProps = {
  businessRegistrationFileName: string;
  agreeAll: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
  onPressUpload: () => void;
  onToggleAll: () => void;
  onTogglePrivacy: () => void;
  onToggleMarketing: () => void;
};

export function PartnerBusinessRegistrationStepSection({
  businessRegistrationFileName,
  agreeAll,
  agreePrivacy,
  agreeMarketing,
  onPressUpload,
  onToggleAll,
  onTogglePrivacy,
  onToggleMarketing,
}: PartnerBusinessRegistrationStepSectionProps) {
  return (
    <View className="mt-[46px] flex-1">
      <View className="gap-[63px]">
        <SignupStepTitle
          firstLine="사업자 등록증 등록 및"
          secondLine="약관 동의를 진행해주세요!"
          highlight="사업자 등록증"
        />
        <FileUploadButton
          fileName={businessRegistrationFileName}
          onPressUpload={onPressUpload}
        />
      </View>
      <AgreementFooter
        agreements={{ agreeAll, agreePrivacy, agreeMarketing }}
        onToggleAll={onToggleAll}
        onTogglePrivacy={onTogglePrivacy}
        onToggleMarketing={onToggleMarketing}
      />
    </View>
  );
}
