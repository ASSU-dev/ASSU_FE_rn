import { SignupStepTitle } from "../SignupStepTitle";
import { View } from "react-native";
import { CredentialsFields } from "../components/CredentialsFields";

type PartnerCredentialsStepSectionProps = {
	partnerEmail: string;
	partnerPassword: string;
	onChangePartnerEmail: (value: string) => void;
	onChangePartnerPassword: (value: string) => void;
};

export function PartnerCredentialsStepSection({
	partnerEmail,
	partnerPassword,
	onChangePartnerEmail,
	onChangePartnerPassword,
}: PartnerCredentialsStepSectionProps) {
	return (
		<View className="mt-[46px] gap-[56px]">
			<SignupStepTitle
				firstLine="아이디/비밀번호를"
				secondLine="입력해주세요!"
			/>
			<CredentialsFields
				emailValue={partnerEmail}
				passwordValue={partnerPassword}
				onChangeEmail={onChangePartnerEmail}
				onChangePassword={onChangePartnerPassword}
			/>
		</View>
	);
}
