import { Pressable, Text, View } from "react-native";

type StudentVerificationStepSectionProps = {
	school: string;
	onPressVerify: () => void;
};

export function StudentVerificationStepSection({
	school,
	onPressVerify,
}: StudentVerificationStepSectionProps) {
	return (
		<View className="mt-[46px] gap-[56px]">
			<View className="gap-[13px]">
				<Text className="text-[25px] font-semibold text-content-primary">
					<Text className="text-primary">{school}</Text> 학생이시군요!
				</Text>
				<Text className="text-[25px] font-semibold text-content-primary">
					재학중이신 학교를
				</Text>
				<Text className="text-[25px] font-semibold text-content-primary">
					인증해주세요!
				</Text>
			</View>
			<Pressable
				onPress={onPressVerify}
				className="h-[56px] w-full items-center justify-center rounded-[12px] border border-primary"
			>
				<Text className="text-[20px] font-medium text-primary">
					LMS 인증하기
				</Text>
			</Pressable>
		</View>
	);
}
