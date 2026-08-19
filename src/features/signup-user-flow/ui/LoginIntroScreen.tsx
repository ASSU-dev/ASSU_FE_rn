import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
	const insets = useSafeAreaInsets();

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
				<View style={{ paddingTop: insets.top }}>{/* status bar space */}</View>
			) : null}

			<View className="flex-1 items-center justify-center">
				<AssuLogoIcon width={122} height={40} />
			</View>

			{showHomeIndicator ? (
				<View
					className="self-center h-[5px] w-[134px] rounded-full bg-content-primary"
					style={{ marginBottom: insets.bottom + 8 }}
				/>
			) : null}
		</Pressable>
	);
}
