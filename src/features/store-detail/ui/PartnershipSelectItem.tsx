import { Pressable, Text, View } from "react-native";
import type { StoreBenefit } from "@/entities/store";
import { CheckCircleOff, CheckCircleOn } from "@/shared/assets/icons";
import { useMultiLineText } from "../lib/useMultiLineText";

interface PartnershipSelectItemProps {
	benefit: StoreBenefit;
	isSelected: boolean;
	onPress: () => void;
}

export function PartnershipSelectItem({
	benefit,
	isSelected,
	onPress,
}: PartnershipSelectItemProps) {
	const { isMultiLine, onTextLayout } = useMultiLineText();

	const hasCondition = benefit.people != null || benefit.cost != null;

	const conditionText = (() => {
		const parts: string[] = [];
		if (benefit.people != null) parts.push(`${benefit.people}명 이상 이용 시`);
		if (benefit.cost != null)
			parts.push(`${benefit.cost.toLocaleString()}원 이상 시`);
		return parts.join(", ");
	})();

	const goodsText = benefit.goods.join(", ");

	return (
		<Pressable
			onPress={onPress}
			className={`flex-row items-center bg-canvas gap-3 rounded-card border px-4 py-3 ${
				isSelected ? "border-primary" : "border-neutral-variant"
			}`}
		>
			{isSelected ? (
				<CheckCircleOn width={22} height={22} />
			) : (
				<CheckCircleOff width={22} height={22} />
			)}
			<View className="flex-1 gap-1.5">
				<View className="flex-row items-center gap-x-1.5">
					<View className="shrink-0 rounded-full bg-neutral px-2.5 py-1">
						<Text className="font-regular text-[11px] text-content-secondary">
							{benefit.adminName}
						</Text>
					</View>
					{hasCondition ? (
						isMultiLine ? (
							<View className="flex-1 gap-0.5">
								<Text
									className="font-semibold text-sm text-content-primary"
									numberOfLines={1}
								>
									{conditionText}
								</Text>
								{goodsText.length > 0 && (
									<Text
										className="font-semibold text-sm text-primary"
										numberOfLines={1}
									>
										{goodsText}
									</Text>
								)}
							</View>
						) : (
							<Text
								className="flex-1 font-semibold text-sm"
								onTextLayout={onTextLayout}
							>
								<Text className="text-content-primary">
									{conditionText}
									{goodsText.length > 0 ? ", " : ""}
								</Text>
								{goodsText.length > 0 && (
									<Text className="text-primary">{goodsText}</Text>
								)}
							</Text>
						)
					) : (
						<Text className="flex-1 font-semibold text-sm text-content-primary">
							{benefit.content}
						</Text>
					)}
				</View>
			</View>
		</Pressable>
	);
}
