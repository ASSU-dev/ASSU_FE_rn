import { Pressable, ScrollView, Text, View } from "react-native";

import type { StoreCategory, StoreCategoryConfig } from "@/entities/store";
import { STORE_CATEGORIES } from "@/entities/store";
import { shadowNeutral } from "@/shared/styles/shadows";

interface CategoryChipProps {
	config: StoreCategoryConfig;
	selected: boolean;
	onPress: () => void;
}

function CategoryChip({ config, selected, onPress }: CategoryChipProps) {
	const { label, ChipIcon } = config;

	return (
		<Pressable
			className={`h-[35px] flex-row items-center gap-[4px] rounded-[999px] pl-[5px] pr-gutter ${
				selected ? "bg-primary" : "bg-neutral"
			}`}
			style={shadowNeutral}
			onPress={onPress}
		>
			<View className="h-[23px] w-[23px] items-center justify-center rounded-[999px] bg-canvas">
				<ChipIcon width={12} height={12} />
			</View>
			<Text
				className={`text-[14px] font-regular ${
					selected ? "text-canvas" : "text-content-primary"
				}`}
			>
				{label}
			</Text>
		</Pressable>
	);
}

interface CategoryChipRowProps {
	selectedCategory: StoreCategory | null;
	onToggleCategory: (category: StoreCategory) => void;
}

/** 지도 상단 카테고리 칩 행 — 지도 화면/전체 리스트 화면 공용 */
export function CategoryChipRow({
	selectedCategory,
	onToggleCategory,
}: CategoryChipRowProps) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerClassName="flex-row gap-[8px] px-card-p py-[5px]"
		>
			{STORE_CATEGORIES.map((config) => (
				<CategoryChip
					key={config.value}
					config={config}
					selected={selectedCategory === config.value}
					onPress={() => onToggleCategory(config.value)}
				/>
			))}
		</ScrollView>
	);
}
