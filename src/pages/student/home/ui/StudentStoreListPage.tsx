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
import { BackArrowIcon, LocationIcon } from "@/shared/assets/icons";
import { shadows } from "@/shared/styles/shadows";

interface StoreListItem {
	id: string;
	name: string;
	imageUri?: string;
	benefitLabel?: string;
	benefitHighlight?: string;
	extraBenefitCount?: number;
	distanceText?: string;
	tag?: string;
}

// TODO: GET /students/usable API 연결 후 제거
const MOCK_STORES: StoreListItem[] = [
	{
		id: "1",
		name: "역전할머니맥주 송실대점",
		benefitLabel: "4인이상 식사시,",
		benefitHighlight: "음료제공",
		extraBenefitCount: 2,
		distanceText: "1.5km",
		tag: "IT대 학생회",
	},
	{
		id: "2",
		name: "인쌩맥주 숭실대점",
		benefitLabel: "4인이상 식사시,",
		benefitHighlight: "음료제공",
		extraBenefitCount: 2,
		distanceText: "1.8km",
		tag: "총학생회",
	},
	{
		id: "3",
		name: "면식당 숭실대점",
		benefitLabel: "4인이상 식사시,",
		benefitHighlight: "음료제공",
		extraBenefitCount: 2,
		distanceText: "1.8km",
		tag: "글로벌미디어학부",
	},
	{
		id: "4",
		name: "역전할머니맥주 송실대점",
		benefitLabel: "4인이상 식사시,",
		benefitHighlight: "음료제공",
		extraBenefitCount: 2,
		distanceText: "1.5km",
		tag: "IT대 학생회",
	},
	{
		id: "5",
		name: "면식당 숭실대점",
		benefitLabel: "4인이상 식사시,",
		benefitHighlight: "음료제공",
		extraBenefitCount: 2,
		distanceText: "1.8km",
		tag: "글로벌미디어학부",
	},
];

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

			<FlatList
				data={MOCK_STORES}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<StoreListCard
						name={item.name}
						imageUri={item.imageUri}
						benefitLabel={item.benefitLabel}
						benefitHighlight={item.benefitHighlight}
						extraBenefitCount={item.extraBenefitCount}
						distanceText={item.distanceText}
						tag={item.tag}
					/>
				)}
				ItemSeparatorComponent={StoreListSeparator}
				contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
			/>
		</View>
	);
}

function StoreListSeparator() {
	return <View className="mx-[12px] h-[1px] bg-neutral" />;
}
