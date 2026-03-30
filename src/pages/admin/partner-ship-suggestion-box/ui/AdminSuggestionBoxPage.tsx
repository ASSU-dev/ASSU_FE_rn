// 관리자 제휴 건의함 페이지 — 건의 건수 + 건의 카드 목록

import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import {
	ReportSuggestionDialog,
	useReportSuggestion,
} from "@/features/report-suggestion"; // 제휴 건의 신고 기능
import { BackArrowIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { InfoBanner } from "@/shared/ui/info/InfoBanner";
import { PageLayout } from "@/shared/ui/layout/PageLayout";
import {
	mockEmptySuggestions,
	mockSuggestions,
} from "../model/mockSuggestions";
import { SuggestionBoxEmptyState } from "./SuggestionBoxEmptyState";
import { SuggestionCard } from "./SuggestionCard";

const INFO_MESSAGE = "제휴 혜택을 받을 숭실대 학생들이 제휴 건의함이에요";

const listContentStyle = {
	gap: 20, // card-gap (20px) — 카드 간 간격
	paddingHorizontal: 24, // screen-m (24px)
	paddingTop: 24, // screen-m (24px) — n건 있어요 ↔ 첫 카드
	paddingBottom: 20,
} as const;

export function AdminSuggestionBoxPage() {
	// DEV ONLY
	const [isEmpty, setIsEmpty] = useState(false);
	const suggestions = isEmpty ? mockEmptySuggestions : mockSuggestions;
	const count = suggestions.length;
	const reportState = useReportSuggestion();

	return (
		<>
		<PageLayout
			className="flex-1 bg-canvas"
			contentContainerClassName="flex-1"
			withBottomInset
		>
			<View className="flex-row items-center px-gutter py-[16px]">
				<Pressable onPress={() => router.back()} hitSlop={8}>
					<BackArrowIcon
						width={24}
						height={24}
						color={colorTokens.contentPrimary}
					/>
				</Pressable>
				<View className="flex-1 items-center">
					<Text className="text-[20px] font-semibold text-content-primary leading-caption tracking-caption">
						제휴건의함
					</Text>
				</View>
				<Pressable
					onPress={() => setIsEmpty((v) => !v)}
					className="bg-neutral-variant rounded-sm px-[6px] py-[2px]"
				>
					<Text className="text-[10px] font-medium text-content-secondary">
						{isEmpty ? "돌아가기" : "빈화면"}
					</Text>
				</Pressable>
			</View>

			<View className="px-screen-m gap-screen-m mt-screen-m">
				<InfoBanner message={INFO_MESSAGE} />
				<Text className="text-sm font-medium text-content-primary leading-caption tracking-caption">
					작성된 제휴건의가 <Text className="text-primary">{count}</Text>건
					있어요
				</Text>
			</View>

			{count === 0 ? (
				<SuggestionBoxEmptyState />
			) : (
				<FlatList
					data={suggestions}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<SuggestionCard
							{...item}
							onReport={reportState.open}
						/>
					)}
					contentContainerStyle={listContentStyle}
				/>
			)}
		</PageLayout>

		<ReportSuggestionDialog state={reportState} />
		</>
	);
}
