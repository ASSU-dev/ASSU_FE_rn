import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import {
	Animated,
	Easing,
	Modal,
	Platform,
	Pressable,
	Text,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";

type BottomActionSheetProps = {
	visible: boolean;
	title: string;
	description?: string;
	actionLabel: string;
	onAction: () => void;
	onClose: () => void;
	extraContent?: ReactNode;
};

export function BottomActionSheet({
	visible,
	title,
	description,
	actionLabel,
	onAction,
	onClose,
	extraContent,
}: BottomActionSheetProps) {
	const insets = useSafeAreaInsets();
	const translateY = useRef(new Animated.Value(80)).current;

	useEffect(() => {
		if (!visible) {
			translateY.setValue(80);
			return;
		}

		Animated.timing(translateY, {
			toValue: 0,
			duration: 360,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start();
	}, [translateY, visible]);

	return (
		<Modal
			visible={visible}
			transparent
			animationType="none"
			statusBarTranslucent={Platform.OS === "android"}
			onRequestClose={onClose}
		>
			<View className="flex-1 justify-end bg-overlay">
				<Pressable className="flex-1" onPress={onClose} />
				<Animated.View
					className="rounded-t-[20px] bg-canvas px-screen-m pt-[15px]"
					style={{
						paddingBottom: Math.max(insets.bottom, 20),
						transform: [{ translateY }],
					}}
				>
					<View className="items-center">
						<View className="h-[5px] w-[36px] rounded-full bg-content-secondary" />
					</View>
					<View className="mt-[30px] items-center gap-[10px]">
						<Text className="text-center text-[25px] font-semibold text-content-primary">
							{title}
						</Text>
						{description ? (
							<Text className="text-center text-[15px] font-regular text-content-primary">
								{description}
							</Text>
						) : null}
					</View>
					{extraContent ? (
						<View className="mt-[16px]">{extraContent}</View>
					) : null}
					<View className="mt-[30px] items-center">
						<MediumButton onPress={onAction}>{actionLabel}</MediumButton>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
}
