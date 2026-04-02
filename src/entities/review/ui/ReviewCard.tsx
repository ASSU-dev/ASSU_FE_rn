import { Image, Pressable, Text, View } from "react-native";
import { StarIcon } from "@/shared/assets/icons";
import { colorTokens } from "@/shared/styles/tokens";
import type { Review, ReviewImage } from "../model/types";

interface Props {
	review: Review;
	action?: { label: string; onPress: () => void };
}

function ReviewImageItem({ source }: { source: ReviewImage }) {
	if (source === "skeleton") {
		return (
			<View
				className="rounded-md"
				style={{
					width: 95,
					height: 95,
					backgroundColor: colorTokens.contentTertiary,
				}}
			/>
		);
	}
	return (
		<Image
			source={source}
			className="rounded-md"
			style={{ width: 95, height: 95 }}
			resizeMode="cover"
		/>
	);
}

function formatDate(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	const h = String(date.getHours()).padStart(2, "0");
	const min = String(date.getMinutes()).padStart(2, "0");
	return `작성일 | ${y}-${m}-${d} ${h}:${min}`;
}

export function ReviewCard({ review, action }: Props) {
	const hasImages = (review.images?.length ?? 0) > 0;

	return (
		<View className="bg-neutral rounded-sm" style={{ padding: 16 }}>
			<View className="flex-row items-center justify-between">
				<Text className="text-lg font-medium text-content-primary">
					{review.department} {review.studentStatus}
				</Text>
				{action && (
					<Pressable onPress={action.onPress} hitSlop={8}>
						<Text className="text-sm text-content-secondary">
							{action.label}
						</Text>
					</Pressable>
				)}
			</View>

			<View className="flex-row gap-[5px] mt-gutter">
				{[1, 2, 3, 4, 5].map((star) => (
					<StarIcon key={star} filled={star <= review.rating} />
				))}
			</View>

			<Text
				className="text-sm text-content-primary mt-gutter"
				style={{ lineHeight: 21 }}
			>
				{review.content}
			</Text>

			{hasImages && (
				<View className="flex-row justify-between mt-gutter">
					{review.images?.map((img, idx) => (
						<ReviewImageItem key={`${idx}-${String(img)}`} source={img} />
					))}
				</View>
			)}

			<Text className="text-sm text-content-secondary mt-gutter">
				{formatDate(review.createdAt)}
			</Text>
		</View>
	);
}
