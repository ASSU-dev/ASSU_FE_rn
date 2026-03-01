import { format } from "date-fns";
import { Text, View } from "react-native";

interface CommentDateProps {
	createdAt: Date;
}

export const CommentDate = ({ createdAt }: CommentDateProps) => {
	const formattedDate = format(createdAt, "yyyy-MM-dd");
	const formattedTime = format(createdAt, "HH:mm");

	return (
		<View className="flex-row gap-1">
			<Text className="text-sm font-regular leading-caption tracking-caption text-content-secondary">
				작성일
			</Text>
			<Text className="text-sm font-regular leading-caption tracking-caption text-content-secondary">
				|
			</Text>
			<Text className="text-sm font-regular leading-caption tracking-caption text-content-secondary">
				{formattedDate}
			</Text>
			<Text className="text-sm font-regular leading-caption tracking-caption text-content-secondary">
				{formattedTime}
			</Text>
		</View>
	);
};
