import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { StoreCategory } from "@/entities/store";
import { StoreListCard } from "@/entities/store";
import { AdminChipRow, CategoryChipRow } from "@/features/map-filter";
import type { UsablePartnershipDTO } from "@/shared/api";
import { BackArrowIcon, LocationIcon } from "@/shared/assets/icons";
import { shadows } from "@/shared/styles/shadows";
import { useStoreListData } from "../model/useStoreListData";

interface StudentStoreListWidgetProps {
	initialCategory?: StoreCategory;
}

export function StudentStoreListWidget({
	initialCategory,
}: StudentStoreListWidgetProps) {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const {
		selectedCategory,
		toggleCategory,
		selectedAdminId,
		toggleAdmin,
		admins,
		stores,
		isLoading,
	} = useStoreListData({ initialCategory });

	return (
		<View className="flex-1 bg-canvas">
			<StoreListSearchBar />

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

			{/* 검색 결과 */}
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

// 검색바
function StoreListSearchBar() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	return (
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
	);
}

// 학생용 제휴 매장 리스트 카드 - 포매팅
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

function StoreListSeparator() {
	return <View className="mx-[12px] h-[1px] bg-neutral" />;
}
