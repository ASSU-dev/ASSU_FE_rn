import { View } from "react-native";
import { CommentAuthor } from "./CommentAuthor";
import { CommentContent } from "./CommentContent";
import { CommentDate } from "./CommentDate";
import { CommentDeleteButton } from "./CommentDeleteButton";
import { CommentImages } from "./CommentImages";
import { CommentRating } from "./CommentRating";

interface CommentCardProps {
	comment: {
		author: { department: string };
		rating: number;
		content: string;
		createdAt: Date;
		images?: string[];
	};
	onDelete: () => void;
}

export function CommentCard({ comment, onDelete }: CommentCardProps) {
	const hasImages = (comment.images?.length ?? 0) > 0;

	return (
		<View
			className="w-full px-card-p pb-card-p rounded-card bg-neutral flex-col"
			style={{ paddingTop: 17.5 }}
		>
			<View className="flex-row justify-between items-center">
				<CommentAuthor author={comment.author} />
				<CommentDeleteButton onDelete={onDelete} />
			</View>

			<View style={{ marginTop: 25.5 }}>
				<CommentRating value={comment.rating} />
			</View>

			<View style={{ marginTop: 10 }}>
				<CommentContent content={comment.content} />
			</View>

			{hasImages && (
				<View style={{ marginTop: 8 }}>
					<CommentImages images={comment.images ?? []} />
				</View>
			)}

			<View style={{ marginTop: hasImages ? 10 : 8 }}>
				<CommentDate createdAt={comment.createdAt} />
			</View>
		</View>
	);
}
