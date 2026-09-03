import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import {
	MapCategoryBarIcon,
	MapCategoryBarSelectedIcon,
	MapCategoryBeautyIcon,
	MapCategoryBeautySelectedIcon,
	MapCategoryCafeIcon,
	MapCategoryCafeSelectedIcon,
	MapCategoryEducationIcon,
	MapCategoryEducationSelectedIcon,
	MapCategoryEntertainmentIcon,
	MapCategoryEntertainmentSelectedIcon,
	MapCategoryHospitalIcon,
	MapCategoryHospitalSelectedIcon,
	MapCategoryLivingIcon,
	MapCategoryLivingSelectedIcon,
	MapCategoryOthersIcon,
	MapCategoryOthersSelectedIcon,
	MapCategoryRestaurantIcon,
	MapCategoryRestaurantSelectedIcon,
	MapCategorySportsIcon,
	MapCategorySportsSelectedIcon,
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
		ChipIcon: MapCategoryRestaurantIcon,
		ChipSelectedIcon: MapCategoryRestaurantSelectedIcon,
	},
	{
		value: "CAFE",
		label: "카페·디저트",
		ChipIcon: MapCategoryCafeIcon,
		ChipSelectedIcon: MapCategoryCafeSelectedIcon,
	},
	{
		value: "BAR",
		label: "주점",
		ChipIcon: MapCategoryBarIcon,
		ChipSelectedIcon: MapCategoryBarSelectedIcon,
	},
	{
		value: "BEAUTY",
		label: "뷰티",
		ChipIcon: MapCategoryBeautyIcon,
		ChipSelectedIcon: MapCategoryBeautySelectedIcon,
	},
	{
		value: "ENTERTAINMENT",
		label: "문화·오락",
		ChipIcon: MapCategoryEntertainmentIcon,
		ChipSelectedIcon: MapCategoryEntertainmentSelectedIcon,
	},
	{
		value: "SPORTS",
		label: "헬스·스포츠",
		ChipIcon: MapCategorySportsIcon,
		ChipSelectedIcon: MapCategorySportsSelectedIcon,
	},
	{
		value: "LIVING",
		label: "생활·편의",
		ChipIcon: MapCategoryLivingIcon,
		ChipSelectedIcon: MapCategoryLivingSelectedIcon,
	},
	{
		value: "HOSPITAL",
		label: "병원·약국",
		ChipIcon: MapCategoryHospitalIcon,
		ChipSelectedIcon: MapCategoryHospitalSelectedIcon,
	},
	{
		value: "EDUCATION",
		label: "학습공간",
		ChipIcon: MapCategoryEducationIcon,
		ChipSelectedIcon: MapCategoryEducationSelectedIcon,
	},
	{
		value: "OTHERS",
		label: "기타",
		ChipIcon: MapCategoryOthersIcon,
		ChipSelectedIcon: MapCategoryOthersSelectedIcon,
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
