import type { SignupAgreementState } from "@/entities/signup";
import { SignupAgreementSection } from "../SignupAgreementSection";
import { View } from "react-native";

type AgreementFooterProps = {
	agreements: SignupAgreementState;
	onToggleAll: () => void;
	onTogglePrivacy: () => void;
	onToggleMarketing: () => void;
	className?: string;
};

export function AgreementFooter({
	agreements,
	onToggleAll,
	onTogglePrivacy,
	onToggleMarketing,
	className = "mb-[22px] mt-auto",
}: AgreementFooterProps) {
	return (
		// Footer는 각 step 섹션에서 항상 화면 하단에 고정되는 패턴이라 공통화합니다.
		<View className={className}>
			<SignupAgreementSection
				agreeAll={agreements.agreeAll}
				agreePrivacy={agreements.agreePrivacy}
				agreeMarketing={agreements.agreeMarketing}
				onToggleAll={onToggleAll}
				onTogglePrivacy={onTogglePrivacy}
				onToggleMarketing={onToggleMarketing}
			/>
		</View>
	);
}

