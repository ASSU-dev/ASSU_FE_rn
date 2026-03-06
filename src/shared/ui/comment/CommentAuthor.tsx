import { Text } from "react-native";

interface CommentAuthorProps {
	author: { department: string };
}

export function CommentAuthor({ author }: CommentAuthorProps) {
	return (
		<Text className="text-lg font-medium text-content-primary leading-body tracking-body">
			{author.department}
		</Text>
	);
}
