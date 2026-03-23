import { Pressable, Text, View } from "react-native";
import { AssuLogoIcon } from "@/shared/assets/icons";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { LoginUnderlineInput } from "@/shared/ui/input";

type LoginFormScreenProps = {
	email: string;
	password: string;
	onPressSignup: () => void;
};

export function LoginFormScreen({
	email,
	password,
	onPressSignup,
}: LoginFormScreenProps) {
	return (
		<View className="flex-1 bg-canvas px-screen-m pt-[72px]">
			<View className="mt-[81px] items-center">
				<AssuLogoIcon width={89} height={24} />
			</View>

			<View className="mt-[73px] gap-[40px]">
				<View className="gap-[35px]">
					<LoginUnderlineInput label="Email" value={email} />
					<LoginUnderlineInput label="Password" value={password} />
				</View>
				<MediumButton onPress={() => {}}>Login</MediumButton>
			</View>

			<View className="mt-[35px] gap-[25px]">
				<View className="h-[0.5px] bg-content-secondary mx-[15px]" />
				<View className="h-[41px] items-center justify-center rounded-lg bg-primary-tint">
					<Text className="text-[13px] font-semibold text-primary">
						LMS 학생 로그인
					</Text>
				</View>
				<View className="items-center gap-[15px]">
					<Text className="text-[13px] font-regular text-content-secondary">
						아직 계정이 없으신가요?
					</Text>
					<Pressable onPress={onPressSignup}>
						<Text className="text-[13px] font-semibold text-primary underline">
							회원가입하기
						</Text>
					</Pressable>
				</View>
			</View>

			<View className="mt-auto mb-[8px] self-center h-[5px] w-[134px] rounded-full bg-content-primary" />
		</View>
	);
}
