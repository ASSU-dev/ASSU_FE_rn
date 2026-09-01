import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { StoreCategory } from "@/entities/store";
import { StoreListCard } from "@/entities/store";
import { useSuggestionAdmins } from "@/entities/suggestion";
import {
	AdminChipRow,
	type AdminFilterItem,
	CategoryChipRow,
} from "@/features/map-filter";
import { useGetUsablePartnershipQuery } from "@/features/store-list/api/useGetUsablePartnershipQuery";
import type { UsablePartnershipDTO } from "@/shared/api";
import { BackArrowIcon, LocationIcon } from "@/shared/assets/icons";
import { shadows } from "@/shared/styles/shadows";

function PartnershipStoreCard({
	item,
	onPress,
}: {
	item: UsablePartnershipDTO;
	onPress?: () => void;
}) {
	const hasCondition = item.people != null || item.cost != null;

	let benefitLabel: string | undefined;
	let benefitHighlight: string | undefined;

	if (hasCondition) {
		if (item.criterionType === "HEADCOUNT" && item.people) {
			benefitLabel = `${item.people}인 이상 이용 시, `;
		} else if (item.criterionType === "PRICE" && item.cost) {
			benefitLabel = `${item.cost.toLocaleString()}원 이상 시, `;
		}
		if (item.criterionType === "PRICE" || item.criterionType === "HEADCOUNT") {
			benefitHighlight = item.category ?? " 혜택";
		} else if (item.optionType === "DISCOUNT" && item.discountRate) {
			benefitHighlight = `${item.discountRate}% 할인`;
		}
	} else {
		benefitLabel = item.note ?? undefined;
	}

	return (
		<StoreListCard
			name={item.partnerName ?? ""}
			imageUri={item.partnerProfileUrl ?? undefined}
			benefitLabel={benefitLabel}
			benefitHighlight={benefitHighlight}
			extraBenefitCount={item.extraCount}
			tag={item.adminName}
			onPress={onPress}
		/>
	);
}

interface StudentStoreListPageProps {
	initialCategory?: StoreCategory;
}

export function StudentStoreListPage({
	initialCategory,
}: StudentStoreListPageProps) {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const [selectedCategory, setSelectedCategory] =
		useState<StoreCategory | null>(initialCategory ?? null);
	const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

	const { data: suggestionAdmins = [] } = useSuggestionAdmins();
	const admins = useMemo<AdminFilterItem[]>(
		() =>
			suggestionAdmins.map((item) => ({ id: item.value, name: item.label })),
		[suggestionAdmins],
	);

	const { data: response, isLoading } = useGetUsablePartnershipQuery({
		all: true,
		storeCategory: selectedCategory ?? undefined,
		adminId: selectedAdminId ? Number(selectedAdminId) : undefined,
	});
	const stores = response?.result ?? [];

	const toggleCategory = (category: StoreCategory) => {
		setSelectedCategory((prev) => (prev === category ? null : category));
	};

	const toggleAdmin = (adminId: string) => {
		setSelectedAdminId((prev) => (prev === adminId ? null : adminId));
	};

	return (
		<View className="flex-1 bg-canvas">
			<View
				className="flex-row items-center gap-gutter bg-canvas px-card-p pb-3 mb-1"
				style={{ ...shadows.neutral, paddingTop: insets.top + 12 }}
			>
				<Pressable onPress={() => router.back()} hitSlop={8}>
					<BackArrowIcon width={24} height={24} />
				</Pressable>
				<Pressable
					className="flex-1 flex-row items-center gap-gutter rounded-[8px] bg-neutral p-gutter"
					onPress={() => router.push("/(protected)/student/map-search")}
				>
					<LocationIcon width={14} height={18} />
					<Text className="font-regular text-sm leading-caption tracking-caption text-content-secondary">
						다양한 제휴매장을 검색해보세요
					</Text>
				</Pressable>
			</View>

			<View style={{ flexShrink: 0 }}>
				<CategoryChipRow
					selectedCategory={selectedCategory}
					onToggleCategory={toggleCategory}
					withShadow={false}
				/>

				<View className="h-2" />

				<AdminChipRow
					admins={admins}
					selectedAdminId={selectedAdminId}
					onToggleAdmin={toggleAdmin}
				/>

				<View className="h-3" />
			</View>

			{isLoading ? null : stores.length === 0 ? (
				<View className="flex-1 items-center justify-center pb-[150px]">
					<Text className="font-regular text-sm text-content-secondary">
						이용 가능한 제휴 매장이 없습니다
					</Text>
				</View>
			) : (
				<FlatList
					style={{ flex: 1 }}
					data={stores}
					keyExtractor={(item) => String(item.partnershipId)}
					renderItem={({ item }) => {
						const storeId = item.storeId;
						return (
							<PartnershipStoreCard
								item={item}
								onPress={
									storeId !== undefined
										? () =>
												router.push({
													pathname:
														"/(protected)/student/store/[storeId]/detail",
													params: {
														storeId,
														storeName: item.partnerName,
													},
												})
										: undefined
								}
							/>
						);
					}}
					ItemSeparatorComponent={StoreListSeparator}
					contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
				/>
			)}
		</View>
	);
}

function StoreListSeparator() {
	return <View className="mx-[12px] h-[1px] bg-neutral" />;
}
