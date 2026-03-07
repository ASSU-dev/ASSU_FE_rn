import { Pressable, Text } from "react-native";

interface CommentDeleteButtonProps {
	onDelete: () => void;
	isLoading?: boolean;
}

export function CommentDeleteButton({
	onDelete,
	isLoading,
}: CommentDeleteButtonProps) {
	return (
		<Pressable onPress={onDelete} disabled={isLoading}>
			<Text className="text-sm font-regular text-content-secondary leading-caption tracking-caption">
				삭제하기
			</Text>
		</Pressable>
	);
}
