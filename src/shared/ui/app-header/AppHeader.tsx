import { Pressable, View } from "react-native";
import { BellFill, Logo } from "@/shared/assets/icons";

interface AppHeaderProps {
	onNotificationPress?: () => void;
}

export function AppHeader({ onNotificationPress }: AppHeaderProps) {
	return (
		<View className="flex-row items-center justify-between">
			<Logo width={40} height={40} />
			<Pressable onPress={onNotificationPress} hitSlop={8}>
				<BellFill width={24} height={24} />
			</Pressable>
		</View>
	);
}
