import { View } from "react-native";
import { Checkbox } from "@/shared/ui/checkbox";

type SignupAgreementSectionProps = {
	agreeAll: boolean;
	agreePrivacy: boolean;
	agreeMarketing: boolean;
	onToggleAll: () => void;
	onTogglePrivacy: () => void;
	onToggleMarketing: () => void;
};

export function SignupAgreementSection({
	agreeAll,
	agreePrivacy,
	agreeMarketing,
	onToggleAll,
	onTogglePrivacy,
	onToggleMarketing,
}: SignupAgreementSectionProps) {
	return (
		<View className="w-full">
			<Checkbox
				checked={agreeAll}
				label="약관 전체동의"
				showDivider
				onPress={onToggleAll}
			/>
			<Checkbox
				checked={agreePrivacy}
				label="개인정보 및 위치정보 수집 동의 (필수)"
				onPress={onTogglePrivacy}
			/>
			<Checkbox
				checked={agreeMarketing}
				label="Email 및 SMS 마케팅 수신 동의 (선택)"
				onPress={onToggleMarketing}
			/>
		</View>
	);
}
