import { useRouter } from "expo-router";
import { useRef, useState } from "react";
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

import type { PopularStore, SearchResultStore } from "@/entities/store";
import { useOpenChatRoom } from "@/features/chat";
import { usePopularStores, useSearchStores } from "@/features/map-search";
import { BackArrowIcon, CloseIcon, LocationIcon } from "@/shared/assets/icons";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { shadows } from "@/shared/styles/shadows";
import { colorTokens } from "@/shared/styles/tokens";
import { SearchResultCard } from "@/widgets/map";

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
	const showPopular = !isSearching && role !== "partner";

	const { data: popularStores = [] } = usePopularStores();
	const { data: searchResults = [], isLoading: isSearchLoading } =
		useSearchStores(debouncedQuery.trim());

	const handleActionPress = (store: SearchResultStore) => {
		if (role === "student") return;

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
				className="flex-row items-center gap-gutter bg-canvas px-card-p pb-3"
				style={{ ...shadows.neutral, paddingTop: insets.top + 12 }}
			>
				<Pressable onPress={() => router.back()} hitSlop={8}>
					<BackArrowIcon width={24} height={24} />
				</Pressable>
				<View className="flex-1 flex-row items-center gap-gutter rounded-[8px] bg-neutral p-gutter">
					<LocationIcon width={14} height={18} />
					<View className="flex-1 justify-center" style={{ height: 21 }}>
						<TextInput
							ref={inputRef}
							autoFocus
							value={query}
							onChangeText={setQuery}
							className="w-full font-regular text-sm tracking-caption text-content-primary"
							placeholder="찾으시는 제휴 가게가 없나요?"
							placeholderTextColor={colorTokens.contentSecondary}
							returnKeyType="search"
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

			{isSearching ? (
				!isSearchLoading && searchResults.length === 0 ? (
					<View className="flex-1 items-center justify-start pt-[15rem] gap-2 px-6">
						<Text className="w-full text-center font-medium text-[16px] leading-[1.3] text-content-primary">
							검색결과를 찾지 못했어요!
						</Text>
						<Text className="w-full text-center font-regular text-[14px] leading-[1.5] text-content-secondary">
							{
								"매장을 찾지 못해 페이지를 표시할 수 없어요.\n이용에 불편을 드려 죄송합니다."
							}
						</Text>
					</View>
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
								onPress={
									role === "student" && onStorePress && item.storeId
										? () => onStorePress(item)
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
				) : null
			) : (
				showPopular &&
				popularStores.length > 0 && (
					<View className="px-[14px] pt-5">
						<Text className="mb-4 font-semibold text-[15px] leading-[1.3] text-content-primary">
							{"🔥 지금 많이 찾는 "}
							<Text className="text-primary">제휴</Text>
							{" 매장"}
						</Text>
						<View className="gap-5">
							{popularStores.map((store, index) => (
								<PopularStoreRow
									key={store.id}
									store={store}
									rank={index + 1}
									onPress={() => setQuery(store.name)}
								/>
							))}
						</View>
					</View>
				)
			)}
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

function PopularStoreRow({
	store,
	rank,
	onPress,
}: {
	store: PopularStore;
	rank: number;
	onPress: () => void;
}) {
	return (
		<Pressable onPress={onPress} className="flex-row items-center gap-[8px]">
			<Text
				className={`w-[17px] font-regular text-[14px] leading-[1.3] tracking-[-0.126px] ${rank <= 3 ? "text-primary" : "text-content-secondary"}`}
			>
				{rank}
			</Text>
			<Text className="font-regular text-[14px] leading-[1.3] text-content-primary">
				{store.name}
			</Text>
		</Pressable>
	);
}
