import { Text, View } from "react-native";

type CompleteStepSectionProps = {
	name: string;
};

export function CompleteStepSection({ name }: CompleteStepSectionProps) {
	return (
		<View className="items-center gap-[26px]">
			<Text className="text-[20px] font-regular text-content-secondary">
				회원가입 완료!
			</Text>
			<View className="items-center">
				<Text className="text-[30px] font-semibold text-content-primary">
					{name} 님
				</Text>
				<Text className="mt-[10px] text-[30px] font-semibold text-content-primary">
					환영합니다!
				</Text>
			</View>
		</View>
	);
}
