import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
	Alert,
	FlatList,
	Keyboard,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { SearchResultStore } from "@/entities/store";
import { useOpenChatRoom } from "@/features/chat";
import { useRecentSearches, useSearchStores } from "@/features/map-search";
import { useGetUsablePartnershipQuery } from "@/features/store-list/api/useGetUsablePartnershipQuery";
import { BackArrowIcon, CloseIcon, LocationIcon } from "@/shared/assets/icons";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { colorTokens } from "@/shared/styles/tokens";
import { EmptyResultView } from "@/shared/ui/empty-state";
import { SearchResultCard } from "@/widgets/map";
import { RecentSearchSection } from "./RecentSearchSection";

type Role = "student" | "admin" | "partner";

interface MapSearchPageProps {
	userRole: Role;
	onStorePress?: (store: SearchResultStore) => void;
}

export function MapSearchPage({
	userRole: role,
	onStorePress,
}: MapSearchPageProps) {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const inputRef = useRef<TextInput>(null);
	const [query, setQuery] = useState("");
	const { openChatRoom } = useOpenChatRoom();
	const debouncedQuery = useDebounce(query, 300);

	const isSearching = debouncedQuery.trim().length > 0;
	const {
		recentSearches,
		addRecentSearch,
		removeRecentSearch,
		clearRecentSearches,
	} = useRecentSearches();

	const { data: searchResults = [], isLoading: isSearchLoading } =
		useSearchStores(debouncedQuery.trim());
	// 검색 응답에 혜택 목록이 없으면 지도와 같은 제휴 목록의 extraCount로 "외 N가지 제휴"를 채운다.
	const { data: usablePartnerships } = useGetUsablePartnershipQuery(
		{ all: true },
		{ enabled: role === "student" },
	);
	const extraCountByStoreId = useMemo(() => {
		const map = new Map<string, number>();
		for (const partnership of usablePartnerships?.result ?? []) {
			if (partnership.storeId === undefined) continue;
			const key = String(partnership.storeId);
			if (!map.has(key)) map.set(key, partnership.extraCount ?? 0);
		}
		return map;
	}, [usablePartnerships]);

	const handleActionPress = (store: SearchResultStore) => {
		if (role === "student") return;
		addRecentSearch(debouncedQuery);

		if (store.isPartner && store.partnershipId) {
			router.push(`/(protected)/partnership-contract/${store.partnershipId}`);
			return;
		}

		const targetId = Number(role === "admin" ? store.partnerId : store.adminId);
		if (!Number.isSafeInteger(targetId) || targetId <= 0) {
			Alert.alert("채팅 연결 실패", "상대방 정보를 확인할 수 없습니다.");
			return;
		}

		openChatRoom({ role, targetId });
	};

	return (
		<Pressable className="flex-1 bg-canvas" onPress={Keyboard.dismiss}>
			<View
				className="flex-row items-center gap-0.5 bg-canvas px-card-p pb-3"
				style={{ paddingTop: insets.top + 11 }}
			>
				<Pressable onPress={() => router.back()} hitSlop={8}>
					<BackArrowIcon width={24} height={24} />
				</Pressable>
				<View className="flex-1 flex-row items-center gap-1 rounded-[8px] bg-neutral p-gutter">
					<View className="h-5 w-5">
						<LocationIcon
							width={14}
							height={18}
							style={{ position: "absolute", left: 10 / 3, top: 5 / 3 }}
						/>
					</View>
					<View className="flex-1 justify-center" style={{ height: 21 }}>
						<TextInput
							ref={inputRef}
							autoFocus
							value={query}
							onChangeText={setQuery}
							className="w-full font-regular text-sm leading-caption tracking-caption text-content-primary"
							placeholder="찾으시는 제휴 가게가 없나요?"
							placeholderTextColor={colorTokens.contentSecondary}
							returnKeyType="search"
							onSubmitEditing={() => addRecentSearch(query)}
							style={{
								margin: 0,
								padding: 0,
								includeFontPadding: false,
							}}
						/>
					</View>
					{query.length > 0 && (
						<Pressable onPress={() => setQuery("")} hitSlop={8}>
							<CloseIcon width={16} height={16} />
						</Pressable>
					)}
				</View>
			</View>

			{!isSearching && (
				<RecentSearchSection
					keywords={recentSearches}
					onSelect={(keyword) => {
						setQuery(keyword);
						addRecentSearch(keyword);
					}}
					onRemove={removeRecentSearch}
					onClearAll={clearRecentSearches}
				/>
			)}

			{isSearching &&
				(!isSearchLoading && searchResults.length === 0 ? (
					<EmptyResultView />
				) : !isSearchLoading && searchResults.length > 0 ? (
					<FlatList
						data={searchResults}
						keyExtractor={(item: SearchResultStore) => item.id}
						keyboardDismissMode="on-drag"
						keyboardShouldPersistTaps="handled"
						renderItem={({ item }: { item: SearchResultStore }) => (
							<SearchResultCard
								store={item}
								role={role}
								fallbackExtraBenefitCount={
									item.storeId
										? extraCountByStoreId.get(item.storeId)
										: undefined
								}
								onPress={
									role === "student" && onStorePress && item.storeId
										? () => {
												addRecentSearch(debouncedQuery);
												onStorePress(item);
											}
										: undefined
								}
								onActionPress={
									role !== "student" ? () => handleActionPress(item) : undefined
								}
							/>
						)}
						ItemSeparatorComponent={SearchResultSeparator}
						ListHeaderComponent={
							<Text className="font-regular text-[12px] leading-[1.3] text-content-secondary px-[14px] pt-3 pb-1">
								{searchResults.length}개의 검색 결과가 있습니다
							</Text>
						}
						contentContainerStyle={{ paddingHorizontal: 14 }}
					/>
				) : null)}
		</Pressable>
	);
}

function SearchResultSeparator() {
	return (
		<View style={{ paddingVertical: 4 }}>
			<View
				style={{
					height: StyleSheet.hairlineWidth,
					backgroundColor: colorTokens.contentSecondaryAlpha30,
				}}
			/>
		</View>
	);
}
