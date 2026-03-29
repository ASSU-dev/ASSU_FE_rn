// 제휴 건의 카드 — 가게명, 작성자(학과·재학상태), 건의 내용, 작성일을 표시하는 카드

import { format } from "date-fns";
import { Pressable, Text, View } from "react-native";
import type { Suggestion } from "../model/types";

interface SuggestionCardProps extends Suggestion {
	onReport: () => void;
}

export function SuggestionCard({
	storeName,
	department,
	studentStatus,
	content,
	createdAt,
	onReport,
}: SuggestionCardProps) {
	return (
		<View className="bg-neutral rounded-sm p-card-p">
			<View className="flex-row items-center justify-between">
				<Text className="text-lg font-medium text-content-primary leading-body tracking-body">
					{storeName}
				</Text>
				<Pressable onPress={onReport} hitSlop={8}>
					<Text className="text-sm font-regular text-content-secondary leading-caption tracking-caption">
						신고하기
					</Text>
				</Pressable>
			</View>

			<View className="flex-row items-center gap-[8px] mt-gutter">
				<Text className="text-sm font-regular text-content-primary leading-caption tracking-caption">
					{department}
				</Text>
				<View className="bg-neutral-variant rounded-[999px] px-gutter">
					<Text className="text-[11px] font-regular text-content-primary leading-caption tracking-caption">
						{studentStatus}
					</Text>
				</View>
			</View>

			<View className="gap-[8px] mt-[8px]">
				<Text className="text-sm font-regular text-content-primary leading-caption tracking-caption">
					{content}
				</Text>
				<Text className="text-sm font-regular text-primary leading-caption tracking-caption">
					{`작성일 | ${format(createdAt, "yyyy-MM-dd")}  ${format(createdAt, "HH:mm")}`}
				</Text>
			</View>
		</View>
	);
}
