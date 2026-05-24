import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import type { SignupFormState } from "@/features/signup-user-flow/model/types";
import { SignupAgreementSection } from "../SignupAgreementSection";

type AgreementFooterProps = {
	onToggleAll: () => void;
	onTogglePrivacy: () => void;
	onToggleMarketing: () => void;
	className?: string;
};

export function AgreementFooter({
	onToggleAll,
	onTogglePrivacy,
	onToggleMarketing,
	className = "mb-[22px] mt-auto",
}: AgreementFooterProps) {
	const { control } = useFormContext<SignupFormState>();

	return (
		// Footer는 각 step 섹션에서 항상 화면 하단에 고정되는 패턴이라 공통화합니다.
		<View className={className}>
			<Controller
				control={control}
				name="agreements.agreeAll"
				render={({ field: agreeAllField }) => (
					<Controller
						control={control}
						name="agreements.agreePrivacy"
						render={({ field: agreePrivacyField }) => (
							<Controller
								control={control}
								name="agreements.agreeMarketing"
								render={({ field: agreeMarketingField }) => (
									<SignupAgreementSection
										agreeAll={Boolean(agreeAllField.value)}
										agreePrivacy={Boolean(agreePrivacyField.value)}
										agreeMarketing={Boolean(agreeMarketingField.value)}
										onToggleAll={onToggleAll}
										onTogglePrivacy={onTogglePrivacy}
										onToggleMarketing={onToggleMarketing}
									/>
								)}
							/>
						)}
					/>
				)}
			/>
		</View>
	);
}
