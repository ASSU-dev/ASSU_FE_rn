import { View } from "react-native";
import { LabeledInputField } from "../LabeledInputField";

type CredentialsFieldsProps = {
	emailValue: string;
	passwordValue: string;
	onChangeEmail: (value: string) => void;
	onChangePassword: (value: string) => void;
};

export function CredentialsFields({
	emailValue,
	passwordValue,
	onChangeEmail,
	onChangePassword,
}: CredentialsFieldsProps) {
	return (
		<View className="gap-[15px]">
			<LabeledInputField
				label="아이디 (이메일)"
				placeholder="이메일 입력"
				value={emailValue}
				onChangeText={onChangeEmail}
			/>
			<LabeledInputField
				label="비밀번호"
				placeholder="비밀번호 입력"
				value={passwordValue}
				onChangeText={onChangePassword}
				secureTextEntry
			/>
		</View>
	);
}

