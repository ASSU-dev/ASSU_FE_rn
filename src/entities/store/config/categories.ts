import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import {
	MapCategoryBar,
	MapCategoryBarSelected,
	MapCategoryBeauty,
	MapCategoryBeautySelected,
	MapCategoryCafe,
	MapCategoryCafeSelected,
	MapCategoryEducation,
	MapCategoryEducationSelected,
	MapCategoryEntertainment,
	MapCategoryEntertainmentSelected,
	MapCategoryHospital,
	MapCategoryHospitalSelected,
	MapCategoryLiving,
	MapCategoryLivingSelected,
	MapCategoryOthers,
	MapCategoryOthersSelected,
	MapCategoryRestaurant,
	MapCategoryRestaurantSelected,
	MapCategorySports,
	MapCategorySportsSelected,
} from "@/shared/assets/icons";

import type { StoreCategory } from "../model/types";

export interface StoreCategoryConfig {
	value: StoreCategory;
	label: string;
	ChipIcon: ComponentType<SvgProps>;
	ChipSelectedIcon: ComponentType<SvgProps>;
}

/** 지도 카테고리 정의 단일 소스 — 칩/마커/필터가 모두 이 순서를 따른다 */
export const STORE_CATEGORIES: StoreCategoryConfig[] = [
	{
		value: "RESTAURANT",
		label: "음식점",
		ChipIcon: MapCategoryRestaurant,
		ChipSelectedIcon: MapCategoryRestaurantSelected,
	},
	{
		value: "CAFE",
		label: "카페·디저트",
		ChipIcon: MapCategoryCafe,
		ChipSelectedIcon: MapCategoryCafeSelected,
	},
	{
		value: "BAR",
		label: "주점",
		ChipIcon: MapCategoryBar,
		ChipSelectedIcon: MapCategoryBarSelected,
	},
	{
		value: "BEAUTY",
		label: "뷰티",
		ChipIcon: MapCategoryBeauty,
		ChipSelectedIcon: MapCategoryBeautySelected,
	},
	{
		value: "ENTERTAINMENT",
		label: "문화·오락",
		ChipIcon: MapCategoryEntertainment,
		ChipSelectedIcon: MapCategoryEntertainmentSelected,
	},
	{
		value: "SPORTS",
		label: "헬스·스포츠",
		ChipIcon: MapCategorySports,
		ChipSelectedIcon: MapCategorySportsSelected,
	},
	{
		value: "LIVING",
		label: "생활·편의",
		ChipIcon: MapCategoryLiving,
		ChipSelectedIcon: MapCategoryLivingSelected,
	},
	{
		value: "HOSPITAL",
		label: "병원·약국",
		ChipIcon: MapCategoryHospital,
		ChipSelectedIcon: MapCategoryHospitalSelected,
	},
	{
		value: "EDUCATION",
		label: "학습공간",
		ChipIcon: MapCategoryEducation,
		ChipSelectedIcon: MapCategoryEducationSelected,
	},
	{
		value: "OTHERS",
		label: "기타",
		ChipIcon: MapCategoryOthers,
		ChipSelectedIcon: MapCategoryOthersSelected,
	},
];

export const STORE_CATEGORY_CONFIG_MAP: Record<
	StoreCategory,
	StoreCategoryConfig
> = Object.fromEntries(
	STORE_CATEGORIES.map((category) => [category.value, category]),
) as Record<StoreCategory, StoreCategoryConfig>;

export function getStoreCategoryLabel(category: StoreCategory): string {
	return STORE_CATEGORY_CONFIG_MAP[category]?.label ?? "";
}
