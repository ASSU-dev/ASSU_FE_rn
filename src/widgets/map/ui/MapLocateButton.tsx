import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";

const TOP_OFFSET_BELOW_SEARCH_BAR = 80;

interface MapLocateButtonProps {
	onPress: () => void;
	disabled?: boolean;
}

export function MapLocateButton({ onPress, disabled }: MapLocateButtonProps) {
	const insets = useSafeAreaInsets();

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			className="absolute right-card-p flex-row items-center justify-center gap-gutter rounded-full bg-canvas p-gutter"
			style={{
				top: insets.top + TOP_OFFSET_BELOW_SEARCH_BAR,
				...shadows.neutral,
			}}
			hitSlop={8}
		>
			<Ionicons name="locate" size={20} color={colorTokens.contentPrimary} />
		</Pressable>
	);
}
