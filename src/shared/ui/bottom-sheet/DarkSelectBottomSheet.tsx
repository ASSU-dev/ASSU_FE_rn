import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
	Animated,
	Easing,
	Modal,
	PanResponder,
	Platform,
	Pressable,
	Text,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colorTokens } from "@/shared/styles/tokens";

export type DarkSelectBottomSheetItem<T extends string = string> = {
	label: string;
	value: T;
};

type Props<T extends string = string> = {
	visible: boolean;
	title: string;
	items: DarkSelectBottomSheetItem<T>[];
	value: T;
	onChange: (value: T) => void;
	onClose: () => void;
};

const DISMISS_THRESHOLD = 80;

export function DarkSelectBottomSheet<T extends string = string>({
	visible,
	title,
	items,
	value,
	onChange,
	onClose,
}: Props<T>) {
	const insets = useSafeAreaInsets();
	const translateY = useRef(new Animated.Value(300)).current;
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;

	useEffect(() => {
		if (!visible) return;
		translateY.setValue(300);
		Animated.timing(translateY, {
			toValue: 0,
			duration: 200,
			easing: Easing.out(Easing.quad),
			useNativeDriver: true,
		}).start();
	}, [visible, translateY]);

	const animateClose = () => {
		Animated.timing(translateY, {
			toValue: 400,
			duration: 150,
			easing: Easing.in(Easing.quad),
			useNativeDriver: true,
		}).start(() => onCloseRef.current());
	};

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: (_, { dy }) => dy > 2,
			onPanResponderMove: (_, { dy }) => {
				if (dy > 0) translateY.setValue(dy);
			},
			onPanResponderRelease: (_, { dy, vy }) => {
				if (dy > DISMISS_THRESHOLD || vy > 0.8) {
					Animated.timing(translateY, {
						toValue: 400,
						duration: 150,
						easing: Easing.in(Easing.quad),
						useNativeDriver: true,
					}).start(() => onCloseRef.current());
				} else {
					Animated.spring(translateY, {
						toValue: 0,
						useNativeDriver: true,
						damping: 20,
						stiffness: 250,
					}).start();
				}
			},
		}),
	).current;

	return (
		<Modal
			visible={visible}
			transparent
			animationType="none"
			statusBarTranslucent={Platform.OS === "android"}
			onRequestClose={animateClose}
		>
			<View className="flex-1 justify-end bg-[rgba(0,0,0,0.3)]">
				<Pressable className="flex-1" onPress={animateClose} />
				<Animated.View
					{...panResponder.panHandlers}
					className="rounded-t-[20px] pt-[40px]"
					style={{
						backgroundColor: colorTokens.contentPrimary,
						paddingBottom: insets.bottom + 40,
						transform: [{ translateY }],
					}}
				>
					{/* 드래그 핸들 */}
					<View className="items-center pb-[10px]">
						<View
							style={{
								width: 36,
								height: 5,
								borderRadius: 100,
								backgroundColor: "rgba(235, 235, 245, 0.3)",
							}}
						/>
					</View>

					<Text
						className="font-bold px-[30px] py-[20px]"
						style={{
							fontSize: 15,
							lineHeight: 21,
							letterSpacing: -0.32,
							color: colorTokens.contentInverse,
						}}
					>
						{title}
					</Text>

					<View style={{ gap: 15 }}>
						{items.map((item) => {
							const isSelected = item.value === value;
							return (
								<Pressable
									key={item.value}
									className="flex-row items-center justify-between px-[30px]"
									onPress={() => {
										onChange(item.value);
										animateClose();
									}}
								>
									<Text
										className="font-regular"
										style={{
											fontSize: 15,
											lineHeight: 21,
											letterSpacing: -0.32,
											color: isSelected
												? colorTokens.primaryOnDark
												: colorTokens.contentInverse,
										}}
									>
										{item.label}
									</Text>
									{isSelected && (
										<Ionicons
											name="checkmark"
											size={24}
											color={colorTokens.primaryOnDark}
										/>
									)}
								</Pressable>
							);
						})}
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
}
