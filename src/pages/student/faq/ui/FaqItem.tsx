import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

interface FaqItemProps {
	question: string;
	answer: string;
	isExpanded: boolean;
	onToggle: () => void;
}

export function FaqItem({
	question,
	answer,
	isExpanded,
	onToggle,
}: FaqItemProps) {
	const rotation = useSharedValue(isExpanded ? -90 : 90);

	useEffect(() => {
		rotation.value = withTiming(isExpanded ? -90 : 90, { duration: 200 });
	}, [isExpanded, rotation]);

	const animatedChevronStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	return (
		<View className="border-b border-gray-200">
			<Pressable
				onPress={onToggle}
				className="flex-row items-center justify-between px-6 py-5"
			>
				<View className="flex-row items-center flex-1 gap-2 mr-3">
					<Text className="text-base font-bold text-content-primary">Q</Text>
					<Text
						className="text-base text-content-primary flex-1"
						numberOfLines={1}
					>
						{question}
					</Text>
				</View>
				<Animated.View style={animatedChevronStyle}>
					<BackArrowIcon
						width={20}
						height={20}
						color={colorTokens.contentPrimary}
					/>
				</Animated.View>
			</Pressable>

			{isExpanded && (
				<View className="px-6 pb-5">
					<Text className="text-sm text-content-secondary leading-5">
						{answer}
					</Text>
				</View>
			)}
		</View>
	);
}
