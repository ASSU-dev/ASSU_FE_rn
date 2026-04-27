import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import type { Inquiry } from "@/entities/inquiry";
import { colorTokens } from "@/shared/styles/tokens";

interface InquiryItemProps {
	inquiry: Inquiry;
}

export function InquiryItem({ inquiry }: InquiryItemProps) {
	const router = useRouter();
	const isCompleted = inquiry.status === "completed";

	return (
		<Pressable
			onPress={() => router.push(`/customer-service/${inquiry.id}`)}
			className="border-b border-gray-200 flex-row items-center justify-between py-[16px] w-full"
		>
			{/* Left: Title */}
			<View className="flex-1">
				<Text
					className="text-base font-medium text-content-primary tracking-[0.25px]"
					numberOfLines={2}
				>
					{inquiry.title}
				</Text>
			</View>

			{/* Right Column */}
			<View className="gap-3 items-end ml-3">
				{/* DateTime */}
				<Text className="text-xs text-content-secondary tracking-[-0.32px]">
					{inquiry.createdAt}
				</Text>

				{/* Status Badge */}
				<View
					className="px-2.5 py-1 rounded"
					style={{
						backgroundColor: isCompleted
							? "transparent"
							: colorTokens.neutralVariant,
					}}
				>
					<Text
						numberOfLines={1}
						className={`text-xs font-regular tracking-[-0.32px] ${
							isCompleted ? "text-primary" : "text-content-primary"
						}`}
					>
						{isCompleted ? "답변 완료" : "답변 대기중"}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}
