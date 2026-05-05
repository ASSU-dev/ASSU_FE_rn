import { memo, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";

interface FaqItemProps {
	id: string;
	question: string;
	answer: string;
	isExpanded: boolean;
	onToggle: (id: string) => void;
}

export const FaqItem = memo(function FaqItem({
	id,
	question,
	answer,
	isExpanded,
	onToggle,
}: FaqItemProps) {
	const rotation = useSharedValue(isExpanded ? 90 : -90);

	useEffect(() => {
		rotation.value = withTiming(isExpanded ? 90 : -90, { duration: 200 });
	}, [isExpanded, rotation]);

	const animatedChevronStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	const handlePress = () => {
		onToggle(id);
	};

	return (
		<View>
			<Pressable
				onPress={handlePress}
				className="flex-row items-center justify-between px-9 py-5"
			>
				<View className="flex-row flex-1 gap-2 mr-3">
					<Text className="text-[17px] font-semibold text-content-primary">
						Q
					</Text>
					<Text
						className="text-[17px] font-medium text-content-primary flex-1"
						numberOfLines={isExpanded ? undefined : 1}
					>
						{question}
					</Text>
				</View>
				<Animated.View style={animatedChevronStyle}>
					<BackArrowIcon
						width={20}
						height={20}
						color={colorTokens.contentTertiary}
					/>
				</Animated.View>
			</Pressable>

			{isExpanded && (
				<View className="px-9 pb-5">
					<Text className="text-sm text-content-primary leading-5 tracking-body">
						{answer}
					</Text>
				</View>
			)}
		</View>
	);
});
