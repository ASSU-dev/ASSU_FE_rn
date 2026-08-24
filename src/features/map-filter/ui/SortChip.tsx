import { useState } from "react";
import { Pressable, Text } from "react-native";

import { SortArrowDownIcon } from "@/shared/assets/icons";
import {
	DarkSelectBottomSheet,
	type DarkSelectBottomSheetItem,
} from "@/shared/ui/bottom-sheet";
import type { MapSortType } from "../model/useMapFilterStore";

const SORT_ITEMS: DarkSelectBottomSheetItem<MapSortType>[] = [
	{ label: "추천순", value: "recommend" },
	{ label: "거리순", value: "distance" },
];

interface SortChipProps {
	value: MapSortType;
	onChange: (sortType: MapSortType) => void;
}

/** 정렬 선택 칩 — 탭하면 다크 셀렉트 시트로 정렬 방식 선택 */
export function SortChip({ value, onChange }: SortChipProps) {
	const [sheetVisible, setSheetVisible] = useState(false);
	const label =
		SORT_ITEMS.find((item) => item.value === value)?.label ?? "추천순";

	return (
		<>
			<Pressable
				className="h-[34px] flex-row items-center gap-[4px] rounded-[999px] border border-neutral-variant px-[12px]"
				onPress={() => setSheetVisible(true)}
			>
				<Text className="text-[15px] font-semibold text-content-secondary">
					{label}
				</Text>
				<SortArrowDownIcon width={9} height={5} />
			</Pressable>
			<DarkSelectBottomSheet
				visible={sheetVisible}
				title="정렬"
				items={SORT_ITEMS}
				value={value}
				onChange={(sortType) => {
					onChange(sortType);
					setSheetVisible(false);
				}}
				onClose={() => setSheetVisible(false)}
			/>
		</>
	);
}
