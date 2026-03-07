import { format } from "date-fns";
import { Text } from "react-native";

interface CommentDateProps {
	createdAt: Date;
}

export function CommentDate({ createdAt }: CommentDateProps) {
	return (
		<Text className="text-sm font-regular leading-caption tracking-caption text-content-secondary">
			{`작성일 | ${format(createdAt, "yyyy-MM-dd HH:mm")}`}
		</Text>
	);
}
