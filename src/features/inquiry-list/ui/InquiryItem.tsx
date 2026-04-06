import { Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import type { Inquiry } from "../model/types";

interface InquiryItemProps {
	inquiry: Inquiry;
}

export function InquiryItem({ inquiry }: InquiryItemProps) {
	const isCompleted = inquiry.status === "completed";

	return (
		<View className="border-b border-neutralVariant flex-row items-center justify-between py-[16px] w-full">
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
			<View className="gap-1 items-end ml-3">
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
						className={`text-xs font-regular tracking-[-0.32px] ${
							isCompleted ? "text-primary" : "text-content-primary"
						}`}
					>
						{isCompleted ? "답변 완료" : "답변 대기중"}
					</Text>
				</View>
			</View>
		</View>
	);
}
