import { Text } from "react-native";

interface CommentContentProps {
	content: string;
}

export const CommentContent = ({ content }: CommentContentProps) => {
	return (
		<Text className="w-full text-sm font-regular leading-caption tracking-caption text-content-primary">
			{content}
		</Text>
	);
};
