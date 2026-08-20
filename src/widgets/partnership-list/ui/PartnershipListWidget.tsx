import { memo } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { type Partnership, PartnershipCard } from "@/entities/partnership";
import { colorTokens } from "@/shared/styles/tokens";
import { EmptyState } from "@/shared/ui/empty-state";

interface PartnershipListWidgetProps {
	partnerships: Partnership[];
	title?: string;
	variant?: "white" | "gray";
	maxItems?: number;
	isLoading?: boolean;
	isError?: boolean;
	emptyTitle?: string;
	emptyDescription?: string;
	onViewAll?: () => void;
	onPressCard?: (id: string) => void;
}

function PartnershipListEmptyState({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<View className="items-center justify-center gap-[6px] rounded-lg bg-canvas px-card-p py-[20px]">
			<Text className="w-full text-center text-md font-medium leading-body text-content-primary">
				{title}
			</Text>
			<Text className="w-full text-center text-[14px] font-regular leading-caption text-content-secondary">
				{description}
			</Text>
		</View>
	);
}

export const PartnershipListWidget = memo(
	({
		partnerships,
		title = "제휴단체 목록",
		variant = "white",
		maxItems,
		isLoading = false,
		isError = false,
		emptyTitle = "진행 중인 제휴가 없어요",
		emptyDescription = "제휴업체가 추가되면\n여기서 확인할 수 있어요!",
		onViewAll,
		onPressCard,
	}: PartnershipListWidgetProps) => {
		const displayed = maxItems ? partnerships.slice(0, maxItems) : partnerships;
		const hasItems = displayed.length > 0;

		return (
			<View className="gap-2">
				<View className="h-[25px] flex-row items-center justify-between">
					<Text className="text-md font-medium leading-body text-content-primary">
						{title}
					</Text>
					{hasItems && onViewAll ? (
						<Pressable
							onPress={onViewAll}
							hitSlop={8}
							className="px-0.5 py-0.5"
						>
							<Text className="text-sm font-regular leading-caption tracking-caption text-content-secondary">
								전체보기
							</Text>
						</Pressable>
					) : null}
				</View>

				{isLoading ? (
					<View className="items-center py-10">
						<ActivityIndicator color={colorTokens.primary} />
					</View>
				) : isError ? (
					<EmptyState
						title="목록을 불러오지 못했어요"
						description="잠시 후 다시 시도해주세요"
					/>
				) : displayed.length === 0 ? (
					<PartnershipListEmptyState
						title={emptyTitle}
						description={emptyDescription}
					/>
				) : (
					<View className="gap-5">
						{displayed.map((partnership) => (
							<Pressable
								key={partnership.id}
								onPress={() => onPressCard?.(partnership.id)}
							>
								<PartnershipCard {...partnership} variant={variant} />
							</Pressable>
						))}
					</View>
				)}
			</View>
		);
	},
);

PartnershipListWidget.displayName = "PartnershipListWidget";
