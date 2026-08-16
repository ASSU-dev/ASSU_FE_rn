import { Pressable, View } from "react-native";
import { EyeIcon, EyeOffIcon } from "@/shared/assets/icons";

type PasswordVisibilityToggleProps = {
	visible: boolean;
	onPress: () => void;
};

export function PasswordVisibilityToggle({
	visible,
	onPress,
}: PasswordVisibilityToggleProps) {
	return (
		<Pressable onPress={onPress} hitSlop={8}>
			<View className="h-5 w-5 items-center justify-center">
				{visible ? (
					<EyeOffIcon width={18} height={18} />
				) : (
					<EyeIcon width={18} height={18} />
				)}
			</View>
		</Pressable>
	);
}
