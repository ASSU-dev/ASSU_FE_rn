import { Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";

interface RankItemProps {
	rank: number;
	name: string;
	rankColor?: string;
}

export function RankItem({ rank, name, rankColor }: RankItemProps) {
	return (
		<View className="flex-row items-center gap-2">
			<View className="min-w-[17px] h-[18px] justify-center">
				<Text
					className="text-[14px] leading-[18px] font-regular"
					style={{ color: rankColor ?? colorTokens.primary }}
				>
					{rank}
				</Text>
			</View>
			<Text className="text-[14px] leading-[18px] font-regular text-content-primary">
				{name}
			</Text>
		</View>
	);
}
