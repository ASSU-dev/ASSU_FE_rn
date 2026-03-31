import { View } from "react-native";
import { StampActive, StampInactive } from "@/shared/assets/icons";

interface StampItemProps {
	isAchieved: boolean;
}

export const StampItem = ({ isAchieved }: StampItemProps) => {
	return (
		<View className="flex aspect-square items-center justify-center mb-3">
			{isAchieved ? (
				<StampActive width={45} height={45} />
			) : (
				<StampInactive width={45} height={45} />
			)}
		</View>
	);
};
