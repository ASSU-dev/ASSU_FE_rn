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
			<View style={{ minWidth: 17, height: 18, justifyContent: "center" }}>
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
