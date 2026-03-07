import { View } from "react-native";
import { CommentCard } from "./CommentCard";

export function CommentTest() {
	return (
		<View style={{ gap: 10 }}>
			<CommentCard
				comment={{
					author: { department: "IT대학 재학생" },
					rating: 4,
					content:
						"사장님이 너무 친절하세요! 제휴 이벤트 좋았어요!!! 파인애플샤베트 정말 술안주로 최고입니다 👍",
					createdAt: new Date("2025-03-15T18:36:00"),
				}}
				onDelete={() => {}}
			/>
			<CommentCard
				comment={{
					author: { department: "경영대학 재학생" },
					rating: 3,
					content: "무지하게 잘 먹었습니다! 제휴 이벤트 좋았어요!",
					createdAt: new Date("2025-03-15T18:36:00"),
					images: ["", "", ""],
				}}
				onDelete={() => {}}
			/>
		</View>
	);
}
