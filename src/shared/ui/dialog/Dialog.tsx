import type { ReactNode } from "react";
import { Modal, Platform, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CloseIcon } from "@/shared/assets/icons";

interface DialogProps {
	visible: boolean;
	onDismiss?: () => void;
	children: ReactNode;
}

export function Dialog({ visible, onDismiss, children }: DialogProps) {
	const { left, right } = useSafeAreaInsets();
	const horizontalMargin = Math.max(left, right, 32);

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			statusBarTranslucent={Platform.OS === "android"}
			onRequestClose={onDismiss}
		>
			<View
				className="flex-1 justify-center"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
			>
				<View
					className="bg-canvas rounded-lg p-6"
					style={{ marginHorizontal: horizontalMargin }}
				>
					{onDismiss && (
						<Pressable
							className="absolute top-3 right-3 z-50 w-11 h-11 items-center justify-center"
							onPress={onDismiss}
						>
							<CloseIcon width={24} height={24} pointerEvents="none" fill={colorTokens.contentSecondary} />
						</Pressable>
					)}
					{children}
				</View>
			</View>
		</Modal>
	);
}
