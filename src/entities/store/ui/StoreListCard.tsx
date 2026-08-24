import { Image, Pressable, Text, View } from "react-native";

interface StoreListCardProps {
	name: string;
	imageUri?: string;
	/** 혜택 조건 텍스트 (ex. "4인이상 식사시,") */
	benefitLabel?: string;
	/** 파란색으로 강조되는 혜택 텍스트 (ex. "음료제공") */
	benefitHighlight?: string;
	/** 대표 혜택 외 제휴 개수 — 1 이상이면 "외 N가지 제휴" 노출 */
	extraBenefitCount?: number;
	/** 거리 표기 텍스트 (ex. "1.5km") — 포맷팅은 호출부 책임 */
	distanceText?: string;
	/** 우측 상단 학생회 태그 (ex. "IT대 학생회") */
	tag?: string;
	onPress?: () => void;
}

/** 지도 매장 리스트 카드 — 바텀시트/전체 리스트/검색 결과 공용 */
export function StoreListCard({
	name,
	imageUri,
	benefitLabel,
	benefitHighlight,
	extraBenefitCount = 0,
	distanceText,
	tag,
	onPress,
}: StoreListCardProps) {
	const metaParts = [
		extraBenefitCount > 0 ? `외 ${extraBenefitCount}가지 제휴` : null,
		distanceText ?? null,
	].filter((part): part is string => part !== null);

	return (
		<Pressable
			className="flex-row items-center p-gutter"
			onPress={onPress}
			disabled={!onPress}
		>
			{imageUri ? (
				<Image
					source={{ uri: imageUri }}
					className="h-[81px] w-[81px] rounded-[7px]"
					resizeMode="cover"
				/>
			) : (
				<View className="h-[81px] w-[81px] rounded-[7px] bg-neutral" />
			)}

			<View className="ml-[12px] flex-1 flex-row items-start justify-between">
				<View className="flex-1 pr-[8px]">
					<Text
						className="text-sm font-bold text-content-primary"
						numberOfLines={1}
					>
						{name}
					</Text>

					{(benefitLabel || benefitHighlight) && (
						<Text
							className="mt-[10px] text-md font-semibold tracking-[-0.32px]"
							numberOfLines={1}
						>
							{benefitLabel ? (
								<Text className="text-content-primary">{benefitLabel}</Text>
							) : null}
							{benefitHighlight ? (
								<Text className="text-primary">{benefitHighlight}</Text>
							) : null}
						</Text>
					)}

					{metaParts.length > 0 && (
						<Text
							className="mt-[10px] font-regular text-[10px] tracking-[-0.32px] text-content-secondary"
							numberOfLines={1}
						>
							{metaParts.join(" • ")}
						</Text>
					)}
				</View>

				{tag ? (
					<View className="self-start rounded-[999px] bg-neutral px-gutter py-[2px]">
						<Text className="font-regular text-[11px] leading-[21px] tracking-[-0.32px] text-content-secondary">
							{tag}
						</Text>
					</View>
				) : null}
			</View>
		</Pressable>
	);
}
