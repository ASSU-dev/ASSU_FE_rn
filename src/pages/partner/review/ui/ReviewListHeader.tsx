// 리뷰 목록 상단 컨트롤 행
// 좌: 작성된 리뷰가 n건 있어요 / 우: 최신순·별점순 토글

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";

type SortType = "latest" | "rating";

const SORT_LABEL: Record<SortType, string> = {
	latest: "최신순",
	rating: "별점순",
};

interface Props {
	count: number;
}

export function ReviewListHeader({ count }: Props) {
	const [sort, setSort] = useState<SortType>("latest");

	const toggleSort = () =>
		setSort((prev) => (prev === "latest" ? "rating" : "latest"));

	return (
		<View className="flex-row items-center justify-between px-screen-m">
			<Text className="text-sm font-medium text-content-primary">
				작성된 리뷰가 <Text className="text-primary">{count}</Text>건 있어요
			</Text>
			<Pressable
				onPress={toggleSort}
				hitSlop={8}
				className="flex-row items-center gap-[4px]"
			>
				<Text className="text-sm font-medium text-content-primary">
					{SORT_LABEL[sort]}
				</Text>
				<Ionicons
					name="swap-vertical"
					size={14}
					color={colorTokens.contentPrimary}
				/>
			</Pressable>
		</View>
	);
}
