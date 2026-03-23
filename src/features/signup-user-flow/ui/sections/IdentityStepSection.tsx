import { Pressable, Text, View } from "react-native";
import { LoginCheckIcon, LoginNoIcon } from "@/shared/assets/icons";
import { InfoLinkText } from "@/shared/ui/info";
import { LabeledInputField } from "../LabeledInputField";
import { SignupStepTitle } from "../SignupStepTitle";

type IdentityStepSectionProps = {
	phone: string;
	verificationCode: string;
	isCodeSent: boolean;
	countdown: string;
	isVerificationError: boolean;
	onChangePhone: (value: string) => void;
	onChangeVerificationCode: (value: string) => void;
	onSendCode: () => void;
};

export function IdentityStepSection({
	phone,
	verificationCode,
	isCodeSent,
	countdown,
	isVerificationError,
	onChangePhone,
	onChangeVerificationCode,
	onSendCode,
}: IdentityStepSectionProps) {
	return (
		<View className="mt-[46px] gap-[56px]">
			<SignupStepTitle firstLine="본인인증을" secondLine="진행해주세요!" />
			<View className="gap-[10px]">
				<LabeledInputField
					label="전화번호"
					placeholder="전화번호 입력 (숫자만)"
					value={phone}
					onChangeText={onChangePhone}
					rightElement={
						isCodeSent ? (
							<View className="flex-row items-center gap-[5px]">
								<LoginCheckIcon width={15} height={15} />
								<Text className="text-[13px] font-medium text-primary">
									전송완료
								</Text>
							</View>
						) : (
							<Pressable onPress={onSendCode} disabled={phone.length === 0}>
								<Text className="text-[13px] font-medium text-primary">
									인증번호 받기
								</Text>
							</Pressable>
						)
					}
				/>

				{isCodeSent ? (
					<View className="gap-[12px]">
						<LabeledInputField
							label="인증번호"
							placeholder="인증번호 입력"
							value={verificationCode}
							onChangeText={onChangeVerificationCode}
							inputBorderColor={isVerificationError ? "danger" : undefined}
							rightElement={
								isVerificationError ? (
									<View className="flex-row items-center gap-[5px]">
										<LoginNoIcon width={15} height={15} />
										<Text className="text-[13px] leading-caption tracking-caption font-medium text-danger">
											인증완료
										</Text>
									</View>
								) : (
									<Text className="text-[13px] leading-caption tracking-caption font-medium text-primary">
										{countdown}
									</Text>
								)
							}
						/>
						<View className="items-end">
							<InfoLinkText message="인증번호가 오지 않았나요?" />
						</View>
					</View>
				) : null}
			</View>
		</View>
	);
}
