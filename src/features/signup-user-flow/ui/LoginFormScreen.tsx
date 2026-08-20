import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AssuLogoIcon } from "@/shared/assets/icons";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { LoginUnderlineInput } from "@/shared/ui/input";

type LoginFormScreenProps = {
	email: string;
	password: string;
	onChangeEmail: (value: string) => void;
	onChangePassword: (value: string) => void;
	onPressLogin: () => void;
	isLoginPending?: boolean;
	onPressLmsLogin: () => void;
	onPressSignup: () => void;
};

// 상태바 인셋 위에 얹는 여백 (iPhone 기준 기존 pt-[72px] 유지)
const TOP_CONTENT_OFFSET = 24;

export function LoginFormScreen({
	email,
	password,
	onChangeEmail,
	onChangePassword,
	onPressLogin,
	isLoginPending = false,
	onPressLmsLogin,
	onPressSignup,
}: LoginFormScreenProps) {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-canvas px-screen-m pt-[72px]">
			<KeyboardAwareScrollView
				style={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				bottomOffset={24}
			>
				<View className="mt-[81px] items-center">
					<AssuLogoIcon width={122} height={40} />
				</View>

				<View className="mt-[73px] gap-[40px]">
					<View className="gap-[35px]">
						<LoginUnderlineInput
							label="Email"
							value={email}
							placeholder="email@example.com"
							onChangeText={onChangeEmail}
						/>
						<LoginUnderlineInput
							label="Password"
							value={password}
							placeholder="yourpassword"
							onChangeText={onChangePassword}
							secureTextEntry
						/>
					</View>
					<MediumButton onPress={onPressLogin} disabled={isLoginPending}>
						Login
					</MediumButton>
				</View>

				<View className="mt-[35px] gap-[25px]">
					<View className="h-[0.5px] bg-content-secondary mx-[15px]" />
					<Pressable
						onPress={onPressLmsLogin}
						className="h-[41px] items-center justify-center rounded-lg bg-primary-tint"
					>
						<Text className="text-[13px] font-semibold text-primary">
							LMS 학생 로그인
						</Text>
					</Pressable>
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
			</KeyboardAwareScrollView>
		</View>
	);
}
