import { Text, View } from "react-native";
import { AssuLogoFaded } from "@/shared/assets/icons";

interface EmptyResultViewProps {
	message?: string;
	/** 배치 조정용 — 기본값은 화면 중앙 배치 */
	className?: string;
}

// 결과 없음 공용 빈 화면 — 회색 어슈 로고 + 안내 문구, 화면 중앙 배치
export function EmptyResultView({
	message = "검색 결과가 없습니다",
	className = "flex-1 justify-center pb-[150px]",
}: EmptyResultViewProps) {
	return (
		<View className={`items-center gap-[8px] ${className}`}>
			<AssuLogoFaded width={96} height={96} />
			<Text className="text-center font-regular text-[12px] leading-[1.3] text-content-secondary">
				{message}
			</Text>
		</View>
	);
}
