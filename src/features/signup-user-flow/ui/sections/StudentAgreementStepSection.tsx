import { Text, View } from "react-native";
import { LabeledInputField } from "../LabeledInputField";
import { SignupAgreementSection } from "../SignupAgreementSection";

type StudentAgreementStepSectionProps = {
	major: string;
	studentId: string;
	agreeAll: boolean;
	agreePrivacy: boolean;
	agreeMarketing: boolean;
	onToggleAll: () => void;
	onTogglePrivacy: () => void;
	onToggleMarketing: () => void;
};

export function StudentAgreementStepSection({
	major,
	studentId,
	agreeAll,
	agreePrivacy,
	agreeMarketing,
	onToggleAll,
	onTogglePrivacy,
	onToggleMarketing,
}: StudentAgreementStepSectionProps) {
	return (
		<View className="mt-[46px] flex-1">
			<View className="gap-[34px]">
				<View className="gap-[13px]">
					<Text className="text-[25px] font-semibold text-content-primary">
						<Text className="text-primary">LMS 인증</Text> 에 성공했어요!
					</Text>
					<Text className="text-[25px] font-semibold text-content-primary">
						정보 확인 및 약관 동의를
					</Text>
					<Text className="text-[25px] font-semibold text-content-primary">
						진행해주세요!
					</Text>
				</View>
				<View className="gap-[15px]">
					<LabeledInputField
						label="학부"
						value={major}
						editable={false}
						inputTextColor="contentSecondary"
					/>
					<LabeledInputField
						label="학번"
						value={studentId}
						editable={false}
						inputTextColor="contentSecondary"
					/>
				</View>
			</View>
			<View className="mb-[22px] mt-auto">
				<SignupAgreementSection
					agreeAll={agreeAll}
					agreePrivacy={agreePrivacy}
					agreeMarketing={agreeMarketing}
					onToggleAll={onToggleAll}
					onTogglePrivacy={onTogglePrivacy}
					onToggleMarketing={onToggleMarketing}
				/>
			</View>
		</View>
	);
}
