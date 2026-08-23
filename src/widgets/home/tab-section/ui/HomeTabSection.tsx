import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CategoryItem } from "@/entities/store/ui/CategoryItem";
import {
	Bar,
	Beauty,
	Cafe,
	Education,
	Entertainment,
	Hospital,
	Living,
	Others,
	Restaurant,
	Sports,
} from "@/shared/assets/icons";
import { StampBoard } from "@/widgets/stamp-board/ui/StampBoard";

interface HomeTabSectionProps {
	stampCount: number;
}

type Tab = "category" | "event";

const CATEGORIES = [
	{ icon: Restaurant, label: "음식점" },
	{ icon: Cafe, label: "카페·디저트" },
	{ icon: Bar, label: "주점" },
	{ icon: Beauty, label: "뷰티" },
	{ icon: Entertainment, label: "문화·오락" },
	{ icon: Sports, label: "헬스·스포츠" },
	{ icon: Living, label: "생활편의" },
	{ icon: Hospital, label: "병원·약국" },
	{ icon: Education, label: "학습공간" },
	{ icon: Others, label: "기타" },
] as const;

export function HomeTabSection({ stampCount }: HomeTabSectionProps) {
	const [activeTab, setActiveTab] = useState<Tab>("category");

	return (
		<View>
			<View className="flex-row border-b border-neutral">
				{(["category", "event"] as const).map((tab) => {
					const isActive = activeTab === tab;
					return (
						<Pressable
							key={tab}
							onPress={() => setActiveTab(tab)}
							className="relative flex-1 items-center pb-3 pt-1"
						>
							<Text
								className={`font-semibold text-base ${isActive ? "text-content-primary" : "text-content-tertiary"}`}
							>
								{tab === "category" ? "카테고리" : "이벤트"}
							</Text>
							{isActive && (
								<View className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
							)}
						</Pressable>
					);
				})}
			</View>

			{activeTab === "category" && (
				<View className="gap-4 pt-5">
					<View className="flex-row">
						{CATEGORIES.slice(0, 5).map((cat) => (
							<CategoryItem key={cat.label} icon={cat.icon} label={cat.label} />
						))}
					</View>
					<View className="flex-row">
						{CATEGORIES.slice(5).map((cat) => (
							<CategoryItem key={cat.label} icon={cat.icon} label={cat.label} />
						))}
					</View>
				</View>
			)}

			{activeTab === "event" && (
				<View className="pt-5">
					<StampBoard currentCount={stampCount} />
				</View>
			)}
		</View>
	);
}
