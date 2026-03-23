import { Image, Pressable, View } from "react-native";
import { AssuLogoIcon } from "@/shared/assets/icons";

type LoginIntroScreenProps = {
	showStatusBar: boolean;
	showHomeIndicator: boolean;
	onPress: () => void;
	disabled?: boolean;
};

export function LoginIntroScreen({
	showStatusBar,
	showHomeIndicator,
	onPress,
	disabled = false,
}: LoginIntroScreenProps) {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			className="flex-1 bg-canvas"
		>
			<Image
				source={require("@/shared/assets/images/background-left.png")}
				resizeMode="cover"
				className="absolute -left-[0px] h-[385px] w-[345px]"
			/>
			<Image
				source={require("@/shared/assets/images/background-right.png")}
				resizeMode="cover"
				className="absolute -right-[0px] bottom-[0px] h-[326px] w-[345px]"
			/>

			{showStatusBar ? (
				<View className="pt-[59px]">{/* status bar space */}</View>
			) : null}

			<View className="flex-1 items-center justify-center">
				<AssuLogoIcon width={89} height={24} />
			</View>

			{showHomeIndicator ? (
				<View className="mb-[8px] self-center h-[5px] w-[134px] rounded-full bg-content-primary" />
			) : null}
		</Pressable>
	);
}
