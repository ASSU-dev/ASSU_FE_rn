import { Pressable, ScrollView, Text, View } from "react-native";

import { XMarkIcon } from "@/shared/assets/icons";

interface RecentSearchSectionProps {
	keywords: string[];
	onSelect: (keyword: string) => void;
	onRemove: (keyword: string) => void;
	onClearAll: () => void;
}

/** 지도 매장 검색 화면의 최근 검색어 칩 목록 */
export function RecentSearchSection({
	keywords,
	onSelect,
	onRemove,
	onClearAll,
}: RecentSearchSectionProps) {
	if (keywords.length === 0) return null;

	return (
		<View className="pt-[9px]">
			<View className="flex-row items-center justify-between px-[20px]">
				<Text
					className="flex-1 font-semibold text-[14px] leading-[21px] tracking-[-0.32px] text-content-primary"
					numberOfLines={1}
				>
					최근 검색어
				</Text>
				<Pressable onPress={onClearAll} hitSlop={8}>
					<Text className="font-medium text-[10px] leading-[21px] tracking-[-0.32px] text-content-secondary">
						전체 삭제
					</Text>
				</Pressable>
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				className="mt-[6px] grow-0"
				contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}
			>
				{keywords.map((keyword) => (
					<Pressable
						key={keyword}
						onPress={() => onSelect(keyword)}
						className="h-[29px] flex-row items-center justify-center rounded-[999px] border border-neutral-variant px-gutter py-[2px]"
					>
						<Text className="font-regular text-[12px] leading-[21px] tracking-[-0.32px] text-content-primary">
							{keyword}
						</Text>
						<Pressable
							onPress={() => onRemove(keyword)}
							hitSlop={8}
							accessibilityRole="button"
							accessibilityLabel={`${keyword} 최근 검색어 삭제`}
						>
							<XMarkIcon width={16} height={16} />
						</Pressable>
					</Pressable>
				))}
			</ScrollView>
		</View>
	);
}
