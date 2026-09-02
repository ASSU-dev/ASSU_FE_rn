import { useRef } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import type { StoreCategory, StoreCategoryConfig } from "@/entities/store";
import { STORE_CATEGORIES } from "@/entities/store";
import { shadowNeutral } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";

interface CategoryChipProps {
	config: StoreCategoryConfig;
	selected: boolean;
	onPress: () => void;
	withShadow?: boolean;
}

function CategoryChip({
	config,
	selected,
	onPress,
	withShadow = true,
}: CategoryChipProps) {
	const { label, ChipIcon } = config;
	const iconColor = selected ? colorTokens.primary : colorTokens.neutralVariant;

	return (
		<Pressable
			className={`h-[35px] flex-row items-center gap-[4px] rounded-[999px] pl-[5px] pr-gutter ${
				selected ? "bg-primary" : "bg-neutral"
			}`}
			style={withShadow ? shadowNeutral : undefined}
			onPress={onPress}
		>
			<View className="h-[23px] w-[23px] items-center justify-center rounded-[999px] bg-canvas">
				<ChipIcon width={12} height={12} color={iconColor} />
			</View>
			<Text
				className={`text-[14px] font-semibold tracking-[-0.28px] ${
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
	withShadow?: boolean;
}

/** 지도 상단 카테고리 칩 행 — 지도 화면/전체 리스트 화면 공용 */
export function CategoryChipRow({
	selectedCategory,
	onToggleCategory,
	withShadow = true,
}: CategoryChipRowProps) {
	const scrollRef = useRef<ScrollView>(null);
	const positions = useRef<Partial<Record<StoreCategory, number>>>({});

	return (
		<ScrollView
			ref={scrollRef}
			horizontal
			showsHorizontalScrollIndicator={false}
			style={{ flexGrow: 0 }}
			contentContainerClassName="flex-row gap-[8px] px-card-p py-[5px]"
		>
			{STORE_CATEGORIES.map((config) => (
				<View
					key={config.value}
					onLayout={(e) => {
						const x = e.nativeEvent.layout.x;
						positions.current[config.value] = x;
						if (config.value === selectedCategory) {
							scrollRef.current?.scrollTo({
								x: Math.max(0, x - 16),
								animated: false,
							});
						}
					}}
				>
					<CategoryChip
						config={config}
						selected={selectedCategory === config.value}
						onPress={() => onToggleCategory(config.value)}
						withShadow={withShadow}
					/>
				</View>
			))}
		</ScrollView>
	);
}
