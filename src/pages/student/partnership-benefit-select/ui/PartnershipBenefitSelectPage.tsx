import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import {
	useGroupCertificationSessionMutation,
	usePartnershipAuthStore,
	usePersonalCertificationMutation,
	useStorePartnershipQuery,
} from "@/features/partnership-auth";
import { BackArrowIcon } from "@/shared/assets/icons";
import { BenefitSelectButton } from "@/shared/ui/buttons/BenefitSelectButton";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";

export function PartnershipBenefitSelectPage() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const { storeId: storeIdParam } = useLocalSearchParams<{ storeId: string }>();
	const storeId = Number(storeIdParam);
	const storeQuery = useStorePartnershipQuery(
		Number.isSafeInteger(storeId) && storeId > 0 ? storeId : null,
	);
	const store = storeQuery.data ?? null;
	const setStore = usePartnershipAuthStore((state) => state.setStore);
	const setSelectedBenefit = usePartnershipAuthStore(
		(state) => state.setSelectedBenefit,
	);
	const setGroupSession = usePartnershipAuthStore(
		(state) => state.setGroupSession,
	);
	const personalCertification = usePersonalCertificationMutation();
	const groupCertification = useGroupCertificationSessionMutation();
	const benefits = store?.benefits ?? [];
	const selectedBenefit =
		selectedIndex === null ? null : benefits[selectedIndex];

	useEffect(() => {
		if (storeQuery.data) setStore(storeQuery.data);
	}, [setStore, storeQuery.data]);

	const handleComplete = async () => {
		if (!store || !selectedBenefit) return;

		try {
			setSelectedBenefit(selectedBenefit);
			if (selectedBenefit.type === "GROUP") {
				if (!selectedBenefit.people) {
					throw new Error("그룹 인증 인원 정보가 없습니다.");
				}

				const sessionId = await groupCertification.mutateAsync({
					people: selectedBenefit.people,
					storeId: store.storeId,
					adminId: selectedBenefit.adminId,
				});
				setGroupSession({
					sessionId,
					requiredPeople: selectedBenefit.people,
					count: 1,
					status: "WAITING",
					userIds: [],
				});
				router.push("/(protected)/student/partnership-group-certification");
				return;
			}

			await personalCertification.mutateAsync({
				storeId: store.storeId,
				adminId: selectedBenefit.adminId,
			});
			router.push("/(protected)/student/partnership-verification");
		} catch {
			Alert.alert("인증 실패", "제휴 인증을 시작하지 못했습니다.");
		}
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1 px-screen-m">
			<Pressable
				onPress={() => router.back()}
				hitSlop={8}
				className="mt-[9px] size-6 items-center justify-center"
			>
				<BackArrowIcon width={24} height={24} />
			</Pressable>

			<View className="mt-[45px] items-center gap-[12px]">
				<Text className="text-lg font-semibold leading-caption tracking-caption text-primary">
					{store?.storeName ?? "제휴 매장"}
				</Text>
				<Text className="text-[25px] font-semibold leading-[28px] tracking-caption text-content-primary">
					제휴 혜택을 선택해주세요
				</Text>
			</View>

			<View className="mt-[61px] w-full items-center gap-[18px]">
				{storeQuery.isLoading ? (
					<Text className="text-md font-regular text-content-secondary">
						제휴 혜택을 불러오는 중입니다
					</Text>
				) : storeQuery.isError ? (
					<View className="items-center gap-gutter">
						<Text className="text-md font-regular text-content-secondary">
							제휴 혜택을 불러오지 못했습니다
						</Text>
						<Pressable
							onPress={() => storeQuery.refetch()}
							className="rounded-[8px] bg-neutral px-[20px] py-gutter"
						>
							<Text className="text-sm font-semibold text-content-secondary">
								다시 시도
							</Text>
						</Pressable>
					</View>
				) : benefits.length === 0 ? (
					<Text className="text-md font-regular text-content-secondary">
						사용 가능한 제휴 혜택이 없습니다
					</Text>
				) : (
					benefits.map((benefit, index) => (
						<BenefitSelectButton
							key={benefit.id}
							title={benefit.manager}
							description={benefit.contents}
							isSelected={selectedIndex === index}
							dimmed={selectedIndex !== null && selectedIndex !== index}
							onPress={() => setSelectedIndex(index)}
						/>
					))
				)}
			</View>

			<View className="mt-auto items-center pb-[4px]">
				<MediumButton
					disabled={
						selectedIndex === null ||
						personalCertification.isPending ||
						groupCertification.isPending
					}
					onPress={handleComplete}
				>
					{personalCertification.isPending || groupCertification.isPending
						? "인증 중"
						: "선택 완료"}
				</MediumButton>
			</View>
		</PageLayout>
	);
}
