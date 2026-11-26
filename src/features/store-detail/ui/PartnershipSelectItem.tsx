import { Pressable, Text, View } from "react-native";
import type { StoreBenefit } from "@/entities/store";
import { CheckCircleOff, CheckCircleOn } from "@/shared/assets/icons";

interface PartnershipSelectItemProps {
	benefit: StoreBenefit;
	isSelected: boolean;
	onPress: () => void;
}

/** 윗줄 문구: "(유의사항) 혜택 조건". 둘 다 없으면 윗줄을 그리지 않는다. */
function toConditionLine(benefit: StoreBenefit): string | null {
	const caution = benefit.caution?.trim();
	const condition = benefit.benefitCondition?.trim();
	const line = [caution ? `(${caution})` : undefined, condition]
		.filter(Boolean)
		.join(" ");

	return line || null;
}

export function PartnershipSelectItem({
	benefit,
	isSelected,
	onPress,
}: PartnershipSelectItemProps) {
	const conditionLine = toConditionLine(benefit);

	return (
		<Pressable
			onPress={onPress}
			className={`flex-row items-center gap-[17px] rounded-[8px] border bg-canvas p-3 ${
				isSelected ? "border-primary" : "border-neutral-variant"
			}`}
		>
			{isSelected ? (
				<CheckCircleOn width={22} height={22} />
			) : (
				<CheckCircleOff width={22} height={22} />
			)}
			<View className="min-w-0 flex-1 gap-[6px]">
				{conditionLine ? (
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						className="font-medium text-[12px] leading-normal tracking-[-0.32px] text-content-primary"
					>
						{conditionLine}
					</Text>
				) : null}
				<View className="flex-row items-center justify-between gap-[8px]">
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						className="min-w-0 flex-1 font-semibold text-[13px] leading-normal tracking-[-0.32px] text-primary"
					>
						{benefit.benefit}
					</Text>
					{/* 태그는 오른쪽 기준으로 이름 길이만큼 안쪽(왼쪽)으로 늘어난다. 공간이 부족하면 혜택 문구가 줄어든다 */}
					<View className="max-w-full shrink-0 items-center justify-center rounded-full bg-neutral px-[10px] py-[5px]">
						<Text className="font-regular text-[10px] leading-normal tracking-[-0.32px] text-content-primary">
							{benefit.adminName}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
}
