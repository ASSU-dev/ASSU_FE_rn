import { Text, View } from "react-native";

interface PartnerItemProps {
	rank: number;
	name: string;
}
export const PartnerItem = ({ rank, name }: PartnerItemProps) => {
	const rankColorClass = rank <= 3 ? "text-primary" : "text-content-tertiary";

	return (
		<View className="flex-1 flex-row items-center py-2.5 px-1">
			<Text className={`${rankColorClass} font-bold w-7 text-md`}>{rank}</Text>

			<Text
				className="text-content-primary text-md font-medium flex-1"
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{name}
			</Text>
		</View>
	);
};
