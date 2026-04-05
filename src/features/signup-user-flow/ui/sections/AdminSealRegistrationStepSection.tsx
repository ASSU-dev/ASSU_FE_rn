import { AgreementFooter } from "../components/AgreementFooter";
import { FileUploadButton } from "../components/FileUploadButton";
import { AdminStepLayout } from "../layout/AdminStepLayout";

type AdminSealRegistrationStepSectionProps = {
  sealFileName: string;
  agreeAll: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
  onPressUpload: () => void;
  onToggleAll: () => void;
  onTogglePrivacy: () => void;
  onToggleMarketing: () => void;
};

export function AdminSealRegistrationStepSection({
  sealFileName,
  agreeAll,
  agreePrivacy,
  agreeMarketing,
  onPressUpload,
  onToggleAll,
  onTogglePrivacy,
  onToggleMarketing,
}: AdminSealRegistrationStepSectionProps) {
  return (
    <AdminStepLayout
      firstLine="단체의 인감 등록 및"
      secondLine="약관 동의를 진행해주세요!"
      contentGapClassName="flex-1"
    >
      <FileUploadButton
        fileName={sealFileName}
        onPressUpload={onPressUpload}
        className="mt-[63px]"
      />

      <AgreementFooter
        agreements={{ agreeAll, agreePrivacy, agreeMarketing }}
        onToggleAll={onToggleAll}
        onTogglePrivacy={onTogglePrivacy}
        onToggleMarketing={onToggleMarketing}
      />
    </AdminStepLayout>
  );
}
