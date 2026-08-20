import { Pressable, View } from "react-native";
import { BellFill, Logo } from "@/shared/assets/icons";

interface AppHeaderProps {
	onNotificationPress?: () => void;
	hasNotification?: boolean;
}

export function AppHeader({
	onNotificationPress,
	hasNotification,
}: AppHeaderProps) {
	return (
		<View className="flex-row items-center justify-between px-6 pt-4 pb-2">
			<Logo width={40} height={40} />
			<Pressable onPress={onNotificationPress} hitSlop={8}>
				<View className="relative h-6 w-6">
					<BellFill width={24} height={24} />
					{hasNotification && (
						<View className="absolute right-0 top-px h-2 w-2 rounded-[999px] bg-danger" />
					)}
				</View>
			</Pressable>
		</View>
	);
}
