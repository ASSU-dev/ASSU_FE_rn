import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import { CloseNoCircleIcon } from "@/shared/assets/icons";
import { shadowNeutral } from "@/shared/styles/shadows";

interface StudentSelectedStoreCardProps {
	name: string;
	imageUri?: string;
	benefitLabel?: string;
	benefitHighlight?: string;
	extraBenefitCount?: number;
	/** 썸네일 좌하단 오버레이 태그 (ex. "IT대 학생회") */
	tag?: string;
	/** 카드 본문 탭 (매장 상세 이동) */
	onPress?: () => void;
	/** "제휴 인증하기" 버튼 탭 */
	onCertifyPress: () => void;
	/** 카드 닫기 */
	onClose: () => void;
}

/** 지도에서 매장 선택 시 바텀시트 위에 뜨는 플로팅 카드 */
export function StudentSelectedStoreCard({
	name,
	imageUri,
	benefitLabel,
	benefitHighlight,
	extraBenefitCount = 0,
	tag,
	onPress,
	onCertifyPress,
	onClose,
}: StudentSelectedStoreCardProps) {
	return (
		<View className="rounded-[10px] bg-canvas p-gutter" style={shadowNeutral}>
			<Pressable
				className="flex-row items-center gap-[16px]"
				onPress={onPress}
				disabled={!onPress}
			>
				<View>
					{imageUri ? (
						<Image
							source={{ uri: imageUri }}
							style={{ width: 110, height: 110, borderRadius: 8 }}
							contentFit="cover"
							cachePolicy="memory-disk"
							recyclingKey={imageUri}
						/>
					) : (
						<View className="h-[110px] w-[110px] rounded-[8px] bg-neutral" />
					)}
					{tag ? (
						<View className="absolute bottom-[5px] left-[6px] rounded-[999px] bg-neutral px-gutter py-[2px]">
							<Text className="font-regular text-[11px] leading-[21px] tracking-[-0.32px] text-content-secondary">
								{tag}
							</Text>
						</View>
					) : null}
				</View>

				{/* 버튼은 마지막 글자 바로 아래에 일정한 간격으로 붙이고, 열 전체는 썸네일 기준 세로 중앙에 둔다.
				    하단에 고정하면 "외 N가지 제휴"가 없거나 혜택이 1줄일 때 글자와 버튼 사이가 벌어진다 */}
				<View className="flex-1 py-[4px]">
					<View className="gap-[5px] pr-[34px]">
						<Text
							className="text-sm font-bold leading-[16px] text-content-primary"
							numberOfLines={1}
						>
							{name}
						</Text>

						{(benefitLabel || benefitHighlight) && (
							<Text
								className="text-md font-semibold leading-[19px] tracking-[-0.32px]"
								numberOfLines={2}
							>
								{benefitLabel ? (
									<Text className="text-content-primary">{benefitLabel}</Text>
								) : null}
								{benefitHighlight ? (
									<Text className="text-primary">{benefitHighlight}</Text>
								) : null}
							</Text>
						)}

						{extraBenefitCount > 0 && (
							<Text
								className="font-regular text-[10px] leading-[12px] tracking-[-0.32px] text-content-secondary"
								numberOfLines={1}
							>
								외 {extraBenefitCount}가지 제휴
							</Text>
						)}
					</View>

					<Pressable
						className="mt-[8px] items-center justify-center rounded-[7px] bg-primary py-[10px]"
						onPress={(event) => {
							event.stopPropagation();
							onCertifyPress();
						}}
					>
						<Text className="text-[12px] font-semibold leading-[14px] tracking-[-0.32px] text-content-inverse">
							제휴 인증하기
						</Text>
					</Pressable>
				</View>
			</Pressable>
			<Pressable
				className="absolute right-0 top-0 h-[44px] w-[44px] items-center justify-center"
				accessibilityRole="button"
				accessibilityLabel={`${name} 카드 닫기`}
				onPress={onClose}
			>
				<CloseNoCircleIcon width={9.6} height={9.6} />
			</Pressable>
		</View>
	);
}
