import { Text, View } from "react-native";
import { ProfileAvatar } from "@/shared/ui/profile";

interface ReviewStoreSummaryProps {
	storeName: string;
	benefitDescription: string;
}

export function ReviewStoreSummary({
	storeName,
	benefitDescription,
}: ReviewStoreSummaryProps) {
	return (
		<View className="flex-row items-center px-screen-m py-gutter">
			<View className="p-gutter">
				<ProfileAvatar size={60} />
			</View>
			<View className="flex-1 px-gutter">
				<Text className="font-semibold text-lg leading-caption tracking-caption text-content-primary">
					{storeName}
				</Text>
				<Text
					className="font-regular text-sm leading-caption tracking-caption text-content-secondary"
					numberOfLines={1}
				>
					제휴내용 : {benefitDescription}
				</Text>
			</View>
		</View>
	);
}
