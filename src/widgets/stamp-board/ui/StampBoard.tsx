import { View } from "react-native";
import { StampItem } from "@/entities/stamp/ui/StampItem";
import { InfoLinkText } from "@/shared/ui/info";

export const StampBoard = ({ currentCount = 0 }) => {
	const STAMP_LIMIT = 10;

	// 배열 생성 시점에 고유 ID와 위치 정보를 가진 객체 배열로 변환
	const stamps = Array.from({ length: STAMP_LIMIT }, (_, i) => ({
		id: `stamp-slot-${i}`,
		position: i,
	}));

	return (
		<View>
			<View className="bg-neutral border-neutral-variant p-6 rounded-[24px] ">
				<View className="flex-row flex-wrap justify-between px-1 pt-2 gap-1">
					{stamps.map((stamp) => (
						<View key={stamp.id} style={{ width: "18%", aspectRatio: 1 }}>
							<StampItem isAchieved={stamp.position < currentCount} />
						</View>
					))}
				</View>
			</View>
			<View className="ml-[7px] mt-3">
				<InfoLinkText message="스탬프 10개 적립시 기프티콘이 지급됩니다!" />
			</View>
		</View>
	);
};
