import { ActivityIndicator, Text, View } from "react-native";
import { type StoreBenefit, useStorePapers } from "@/entities/store";
import { AppTopBar } from "@/shared/ui/app-top-bar";
import { InfoBanner } from "@/shared/ui/info/InfoBanner";
import { PageLayout } from "@/shared/ui/layout/PageLayout";

interface StudentStoreReviewPageProps {
	storeId: number | null;
	fallbackStoreName?: string;
}

const FALLBACK_TITLE = "제휴 혜택";

export function StudentStoreReviewPage({
	storeId,
	fallbackStoreName,
}: StudentStoreReviewPageProps) {
	const {
		data: storePapers,
		isLoading: isPapersLoading,
		isError: isPapersError,
	} = useStorePapers(storeId);
	const storeName =
		storePapers?.storeName || fallbackStoreName || FALLBACK_TITLE;

	if (storeId === null) {
		return <InvalidStorePage />;
	}

	return (
		<PageLayout
			scrollable
			withBottomInset
			contentContainerClassName="pb-screen-m"
		>
			<AppTopBar title={storeName} />

			<StoreBenefitsSection
				items={storePapers?.partnershipContents ?? []}
				isLoading={isPapersLoading}
				isError={isPapersError}
			/>
		</PageLayout>
	);
}

interface StoreBenefitsSectionProps {
	items: StoreBenefit[];
	isLoading: boolean;
	isError: boolean;
}

function StoreBenefitsSection({
	items,
	isLoading,
	isError,
}: StoreBenefitsSectionProps) {
	return (
		<View className="px-screen-m pb-[20px] pt-[20px]">
			<Text className="text-md font-medium text-content-primary">
				내가 받을 제휴 혜택
			</Text>
			<View className="mt-[12px]">
				<InfoBanner message="QR 인증 시 아래 혜택을 받을 수 있어요" />
			</View>
			<View className="mt-[16px] gap-card-gap">
				{isLoading ? (
					<ActivityIndicator size="small" />
				) : isError ? (
					<Text className="py-[30px] text-center text-sm text-content-secondary">
						제휴 혜택을 불러오지 못했어요.
					</Text>
				) : items.length === 0 ? (
					<Text className="py-[30px] text-center text-sm text-content-secondary">
						현재 적용 가능한 제휴 혜택이 없어요.
					</Text>
				) : (
					items.map((item) => <StoreBenefitCard key={item.id} item={item} />)
				)}
			</View>
		</View>
	);
}

function StoreBenefitCard({ item }: { item: StoreBenefit }) {
	const conditions: string[] = [];
	if (item.people !== undefined) conditions.push(`${item.people}인 이상`);
	if (item.cost !== undefined && item.cost > 0)
		conditions.push(`${item.cost.toLocaleString()}원 이상`);

	return (
		<View className="gap-[10px] rounded-lg border border-neutral-variant bg-canvas px-5 py-4">
			<View className="flex-row items-center justify-between gap-[8px]">
				<View className="shrink rounded-[999px] bg-primary-tint px-gutter py-[3px]">
					<Text
						className="font-medium text-[12px] leading-caption text-primary"
						numberOfLines={1}
					>
						{item.adminName}
					</Text>
				</View>
				{conditions.length > 0 ? (
					<Text className="text-[11px] text-content-secondary">
						{conditions.join(" · ")}
					</Text>
				) : null}
			</View>
			<Text className="text-base font-semibold leading-[22px] text-content-primary">
				{item.content}
			</Text>
			{item.goods.length > 0 ? (
				<View className="flex-row flex-wrap gap-[6px]">
					{item.goods.map((goods, index) => (
						<View
							key={`${index}-${goods}`}
							className="rounded-md bg-neutral px-[8px] py-[3px]"
						>
							<Text className="text-[11px] text-content-secondary">
								{goods}
							</Text>
						</View>
					))}
				</View>
			) : null}
		</View>
	);
}

function InvalidStorePage() {
	return (
		<PageLayout contentContainerClassName="flex-1">
			<AppTopBar title={FALLBACK_TITLE} />
			<View className="flex-1 items-center justify-center px-screen-m">
				<Text className="text-center text-sm text-danger">
					올바르지 않은 가게 정보입니다.
				</Text>
			</View>
		</PageLayout>
	);
}
