import { Text, View } from "react-native";

type LoginUnderlineInputProps = {
	label: string;
	value: string;
};

export function LoginUnderlineInput({
	label,
	value,
}: LoginUnderlineInputProps) {
	return (
		<View>
			<Text className="text-[13px] pl-[15px] py-[5px] font-regular text-content-secondary">
				{label}
			</Text>
			<Text className="text-[17px] p-[15px] font-regular text-content-primary opacity-70">
				{value}
			</Text>
			<View className="h-[0.5px] mx-[15px] bg-content-secondary" />
		</View>
	);
}
