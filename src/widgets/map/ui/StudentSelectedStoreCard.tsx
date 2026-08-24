import { Image, Pressable, Text, View } from "react-native";

import { shadowNeutral } from "@/shared/styles/shadows";

interface StudentSelectedStoreCardProps {
	name: string;
	imageUri?: string;
	benefitLabel?: string;
	benefitHighlight?: string;
	extraBenefitCount?: number;
	distanceText?: string;
	/** 썸네일 좌하단 오버레이 태그 (ex. "IT대 학생회") */
	tag?: string;
	/** 카드 본문 탭 (매장 상세 이동) */
	onPress?: () => void;
	/** "제휴 인증하기" 버튼 탭 */
	onCertifyPress: () => void;
}

/** 지도에서 매장 선택 시 바텀시트 위에 뜨는 플로팅 카드 */
export function StudentSelectedStoreCard({
	name,
	imageUri,
	benefitLabel,
	benefitHighlight,
	extraBenefitCount = 0,
	distanceText,
	tag,
	onPress,
	onCertifyPress,
}: StudentSelectedStoreCardProps) {
	const metaParts = [
		extraBenefitCount > 0 ? `외 ${extraBenefitCount}가지 제휴` : null,
		distanceText ?? null,
	].filter((part): part is string => part !== null);

	return (
		<Pressable
			className="rounded-[10px] bg-canvas p-gutter"
			style={shadowNeutral}
			onPress={onPress}
			disabled={!onPress}
		>
			<View className="flex-row items-center gap-[16px]">
				<View>
					{imageUri ? (
						<Image
							source={{ uri: imageUri }}
							className="h-[110px] w-[130px] rounded-[8px]"
							resizeMode="cover"
						/>
					) : (
						<View className="h-[110px] w-[130px] rounded-[8px] bg-neutral" />
					)}
					{tag ? (
						<View className="absolute bottom-[5px] left-[6px] rounded-[999px] bg-neutral px-gutter py-[2px]">
							<Text className="font-regular text-[11px] leading-[21px] tracking-[-0.32px] text-content-secondary">
								{tag}
							</Text>
						</View>
					) : null}
				</View>

				{/* 피그마 실측: 썸네일과 같은 110px 높이 + py 4px, 버튼은 justify-between으로 하단 고정 */}
				<View className="h-[110px] flex-1 justify-between py-[4px]">
					<View className="gap-[5px]">
						<Text
							className="text-sm font-bold leading-[16px] text-content-primary"
							numberOfLines={1}
						>
							{name}
						</Text>

						{(benefitLabel || benefitHighlight) && (
							<Text
								className="text-md font-semibold leading-[19px] tracking-[-0.32px]"
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
								className="font-regular text-[10px] leading-[12px] tracking-[-0.32px] text-content-secondary"
								numberOfLines={1}
							>
								{metaParts.join(" • ")}
							</Text>
						)}
					</View>

					<Pressable
						className="items-center justify-center rounded-[7px] bg-primary py-[10px]"
						onPress={onCertifyPress}
					>
						<Text className="text-[12px] font-semibold leading-[14px] tracking-[-0.32px] text-content-inverse">
							제휴 인증하기
						</Text>
					</Pressable>
				</View>
			</View>
		</Pressable>
	);
}
