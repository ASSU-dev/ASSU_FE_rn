// DEV ONLY — 빈 상태 / 데이터 상태 전환 버튼
import { Text, TouchableOpacity } from "react-native";

interface ChangeTestButtonProps {
	isEmpty: boolean;
	onToggle: () => void;
}

export function ChangeTestButton({ isEmpty, onToggle }: ChangeTestButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onToggle}
			className="bg-neutral-variant rounded-[4px] px-[6px] py-[2px]"
		>
			<Text className="text-[10px] font-medium text-content-secondary">
				{isEmpty ? "데이터" : "빈화면"}
			</Text>
		</TouchableOpacity>
	);
}
