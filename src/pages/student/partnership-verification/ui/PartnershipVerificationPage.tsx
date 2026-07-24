import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useUserBasicInfo } from "@/entities/user/model/useUserBasicInfo";
import {
	usePartnershipAuthStore,
	usePartnershipUsageMutation,
} from "@/features/partnership-auth";
import {
	PartnershipGroupStatusIcon,
	PartnershipTicketIcon,
} from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import { MediumButton } from "@/shared/ui/buttons/SubmitButton";
import { PageLayout } from "@/shared/ui/layout";
import { InfiniteNoticeMarquee } from "./InfiniteNoticeMarquee";

const PROFILE_IMAGE = require("@/shared/assets/images/partnership-verification-profile.png");

const STUDENT_DETAILS = [
	["학번", "20250000"],
	["소속", "IT 대학"],
	["학과", "글로벌미디어학부"],
	["과정/학기", "학사과정 재학"],
	["학년/학기", "2학년:4학기(예정)"],
] as const;

export function PartnershipVerificationPage() {
	const basicInfo = useUserBasicInfo();
	const store = usePartnershipAuthStore((state) => state.store);
	const benefit = usePartnershipAuthStore((state) => state.selectedBenefit);
	const recordUsage = usePartnershipUsageMutation();

	const handleComplete = async () => {
		if (!store || !benefit) return;

		try {
			await recordUsage.mutateAsync({
				storeId: store.storeId,
				adminId: benefit.adminId,
				adminName: benefit.manager,
				placeName: store.storeName,
				partnershipContent: benefit.contents,
				contentId: benefit.id,
			});
			router.replace({
				pathname: "/(protected)/student/partnership-complete",
				params: { benefit: benefit.contents },
			});
		} catch {
			Alert.alert("처리 실패", "제휴 사용내역을 기록하지 못했습니다.");
		}
	};

	return (
		<PageLayout withBottomInset contentContainerClassName="flex-1">
			<Pressable
				onPress={() => router.back()}
				hitSlop={8}
				className="ml-screen-m mt-[9px] size-6 items-center justify-center"
			>
				<Ionicons name="close" size={24} />
			</Pressable>

			<View className="mt-[9px]">
				<InfiniteNoticeMarquee />
			</View>

			<View
				className="mx-screen-m mt-[24px] h-[500px] rounded-[12px] border px-[17px] py-[16px]"
				style={{
					backgroundColor: colorTokens.neutralAlpha50,
					borderColor: colorTokens.contentSecondary,
				}}
			>
				<View className="flex-row gap-gutter">
					<View className="w-[120px] items-center gap-gutter">
						<Image
							source={PROFILE_IMAGE}
							className="h-[160px] w-[120px] rounded-[8px]"
							resizeMode="cover"
						/>
						<Text className="text-md font-bold text-content-primary">
							{basicInfo?.name ?? "조영찬"}
						</Text>
					</View>

					<View className="flex-1">
						{STUDENT_DETAILS.map(([label, fallback], index) => {
							const value =
								label === "소속"
									? (basicInfo?.department ?? fallback)
									: label === "학과"
										? (basicInfo?.major ?? fallback)
										: fallback;

							return (
								<View
									key={label}
									className={`h-[37px] flex-row items-center justify-between px-[12px] ${
										index === 0 ? "" : "border-t"
									}`}
									style={
										index === 0
											? undefined
											: { borderColor: colorTokens.contentSecondaryAlpha20 }
									}
								>
									<Text className="text-[12px] font-medium text-content-primary">
										{label}
									</Text>
									<Text className="text-[12px] font-semibold text-primary">
										{value}
									</Text>
								</View>
							);
						})}
					</View>
				</View>

				<View className="mt-[20px] flex-row items-center gap-[4px]">
					<PartnershipTicketIcon width={18} height={18} />
					<Text className="text-[12px] font-medium text-content-primary">
						제휴 혜택
					</Text>
				</View>

				<View className="mt-[6px] h-[84px] flex-row items-center justify-between rounded-[8px] border-2 border-primary bg-primary-tint px-[14px]">
					<View className="gap-[2px]">
						<Text className="text-sm font-medium text-content-primary">
							{benefit?.contents ?? "선택한 제휴 혜택"}
						</Text>
						<Text className="text-[20px] font-semibold text-primary">
							{benefit?.goods.join(", ") || "개인 혜택"}
						</Text>
					</View>
					<Text className="text-[14px] font-semibold text-content-primary">
						{benefit?.manager ?? "학생회"}
					</Text>
				</View>

				<View className="mt-[16px] flex-row items-center gap-[2px]">
					<PartnershipGroupStatusIcon width={20} height={11} />
					<Text className="text-[12px] font-medium text-content-primary">
						단체 인증 현황
					</Text>
				</View>

				<View className="mt-[6px] h-[109px] items-center justify-center rounded-[8px] bg-neutral">
					<Text className="text-[12px] font-medium text-content-primary">
						단체 조건이 없는 제휴입니다
					</Text>
				</View>
			</View>

			<View className="mt-auto items-center pb-[4px]">
				<MediumButton
					disabled={!store || !benefit || recordUsage.isPending}
					onPress={handleComplete}
				>
					{recordUsage.isPending ? "처리 중" : "인증 완료"}
				</MediumButton>
			</View>
		</PageLayout>
	);
}
