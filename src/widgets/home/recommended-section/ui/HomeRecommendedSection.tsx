import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { StoreMagazineCard } from "@/entities/store/ui/StoreMagazineCard";

interface RecommendedStore {
	id: string;
	badge: string;
	storeName: string;
	note?: string;
	distance?: string;
	admin?: string;
	imageUri?: string;
}

interface HomeRecommendedSectionProps {
	title: string;
	stores?: RecommendedStore[];
}

const MOCK_STORES: RecommendedStore[] = [
	{
		id: "1",
		badge: "50% 할인",
		storeName: "캐리비안베이",
		note: "외 2가지 제휴",
		distance: "8.5km",
		admin: "총학생회",
	},
	{
		id: "2",
		badge: "인증시 음료제공",
		storeName: "역전할머니맥주 숭실대점",
		note: "외 2가지 제휴",
		distance: "1.5km",
		admin: "IT대 학생회",
	},
	{
		id: "3",
		badge: "50% 할인",
		storeName: "캐리비안베이",
		note: "외 2가지 제휴",
		distance: "8.5km",
		admin: "총학생회",
	},
	{
		id: "4",
		badge: "인증시 음료제공",
		storeName: "역전할머니맥주 숭실대점",
		note: "외 2가지 제휴",
		distance: "1.5km",
		admin: "IT대 학생회",
	},
];

export function HomeRecommendedSection({
	title,
	stores = MOCK_STORES,
}: HomeRecommendedSectionProps) {
	return (
		<View className="gap-4">
			<Text className="px-screen-m font-semibold text-lg text-content-primary">
				{title}
			</Text>
			<FlatList
				data={stores}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.id}
				contentContainerClassName="px-screen-m"
				ItemSeparatorComponent={() => <View className="w-3" />}
				renderItem={({ item }) => (
					<View style={{ width: 180 }}>
						<StoreMagazineCard
							badge={item.badge}
							storeName={item.storeName}
							note={item.note}
							distance={item.distance}
							admin={item.admin}
							imageUri={item.imageUri}
							onPress={() =>
								router.push(
									`/(protected)/student/store/${item.id}/detail?storeName=${encodeURIComponent(item.storeName)}`,
								)
							}
						/>
					</View>
				)}
			/>
		</View>
	);
}
