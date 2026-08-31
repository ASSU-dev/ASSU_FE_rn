import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { StoreImageCarousel } from "@/entities/store/ui/StoreImageCarousel";
import type { PartnershipBenefit } from "@/features/partnership-auth/model/types";
import { StorePartnershipList } from "@/features/select-store-partnership/ui/StorePartnershipList";
import { BackArrowIcon, Location, MapIcon } from "@/shared/assets/icons";
import { AppTopBar } from "@/shared/ui/app-top-bar/AppTopBar";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout/PageLayout";

const MOCK_STORE_INFO = {
	name: "캐리비안 베이",
	distance: "1.2km",
	address: "서울 동작구 장승배로10길 100",
	images: [
		"https://picsum.photos/seed/store1/800/450",
		"https://picsum.photos/seed/store2/800/450",
		"https://picsum.photos/seed/store3/800/450",
	],
};

const MOCK_BENEFITS: PartnershipBenefit[] = [
	{
		id: 1,
		adminId: 1,
		manager: "IT대 학생회",
		contents: "4인이상 식사시,",
		goods: ["음료제공"],
		people: 4,
		cost: null,
		type: "GROUP",
		startDate: "2026.07.11",
		endDate: "2026.12.11",
	},
	{
		id: 2,
		adminId: 2,
		manager: "IT대 학생회",
		contents: "4인이상 식사시,",
		goods: ["음료제공"],
		people: 4,
		cost: null,
		type: "GROUP",
		startDate: "2026.07.11",
		endDate: "2026.12.11",
	},
	{
		id: 3,
		adminId: 3,
		manager: "컴퓨터학부 학생회",
		contents: "음료 구매시,",
		goods: ["50% 할인"],
		people: null,
		cost: null,
		type: "INDIVIDUAL",
		startDate: "2026.06.01",
		endDate: "2026.12.31",
	},
];

interface StoreDetailWidgetProps {
	storeId: number;
	storeName?: string;
}

export function StoreDetailWidget({
	storeId: _storeId,
	storeName: _storeName,
}: StoreDetailWidgetProps) {
	const [selectedBenefitId, setSelectedBenefitId] = useState<number | null>(
		null,
	);

	const selectedBenefit =
		MOCK_BENEFITS.find((b) => b.id === selectedBenefitId) ?? null;

	const handleCertify = () => {
		if (!selectedBenefit) return;

		if (selectedBenefit.type === "GROUP") {
			router.push("/(protected)/student/partnership-group-certification");
			return;
		}

		router.push("/(protected)/student/partnership-verification");
	};

	return (
		<PageLayout
			withTopInset
			withBottomInset={false}
			contentContainerClassName="flex-1"
			header={<AppTopBar title={""} titleAlign="left" />}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<StoreImageCarousel images={MOCK_STORE_INFO.images} />

				<View className="gap-3 px-screen-m pt-5">
					<View className="gap-0.5">
						<Text className="text-[20px] font-bold text-content-primary">
							{MOCK_STORE_INFO.name}
						</Text>
					</View>

					<View className="flex-row items-center gap-1">
						<Location width={16} height={16} />
						<Text className="font-medium text-sm text-content-primary">
							{MOCK_STORE_INFO.address}
						</Text>
						<Pressable className="flex-row items-center gap-1 ml-2">
							<MapIcon width={16} height={16} />
							<Text className="font-medium text-sm text-primary">위치</Text>
						</Pressable>
					</View>
				</View>

				<View className="mx-screen-m my-5 h-[2px] bg-neutral" />

				<View className="gap-3 px-screen-m pb-8">
					<View className="flex-row items-center justify-between">
						<Text className="font-bold text-lg text-content-primary">
							제휴 목록
						</Text>
						<Text className="font-medium text-xs text-content-tertiary">
							하나의 제휴를 선택해 주세요
						</Text>
					</View>

					<StorePartnershipList
						benefits={MOCK_BENEFITS}
						selectedId={selectedBenefitId}
						onSelect={setSelectedBenefitId}
					/>
				</View>
			</ScrollView>

			<View className="border-t border-neutral bg-canvas px-screen-m pb-8 pt-3">
				<MediumButton
					onPress={handleCertify}
					disabled={selectedBenefitId === null}
				>
					제휴 인증하기
				</MediumButton>
			</View>
		</PageLayout>
	);
}
