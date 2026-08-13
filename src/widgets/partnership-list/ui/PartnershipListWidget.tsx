import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { type Partnership, PartnershipCard } from "@/entities/partnership";
import { EmptyState } from "@/shared/ui/empty-state";

interface PartnershipListWidgetProps {
	partnerships: Partnership[];
	title?: string;
	variant?: "white" | "gray";
	maxItems?: number;
	isLoading?: boolean;
	isError?: boolean;
	emptyDescription?: string;
	onViewAll?: () => void;
	onPressCard?: (id: string) => void;
}

export const PartnershipListWidget = memo(
	({
		partnerships,
		title = "제휴단체 목록",
		variant = "white",
		maxItems,
		isLoading = false,
		isError = false,
		emptyDescription = "제휴업체가 추가되면\n여기서 확인할 수 있어요!",
		onViewAll,
		onPressCard,
	}: PartnershipListWidgetProps) => {
		const displayed = maxItems ? partnerships.slice(0, maxItems) : partnerships;

		return (
			<View className="gap-2">
				<View className="flex-row items-center justify-between">
					<Text className="text-lg font-medium text-content-primary">
						{title}
					</Text>
					<Pressable onPress={onViewAll}>
						<Text className="text-base font-regular text-content-secondary">
							전체보기
						</Text>
					</Pressable>
				</View>

				{isLoading ? null : isError ? (
					<EmptyState
						title="목록을 불러오지 못했어요"
						description="잠시 후 다시 시도해주세요"
					/>
				) : displayed.length === 0 ? (
					<EmptyState
						title="진행 중인 제휴가 없어요"
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
