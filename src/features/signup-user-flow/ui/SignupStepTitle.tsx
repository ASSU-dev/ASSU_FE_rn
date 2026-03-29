import { Text, View } from "react-native";

type SignupStepTitleProps = {
	firstLine: string;
	secondLine: string;
	highlight?: string;
};

export function SignupStepTitle({
	firstLine,
	secondLine,
	highlight,
}: SignupStepTitleProps) {
	const [head, tail] = highlight ? firstLine.split(highlight) : [firstLine, ""];

	return (
		<View className="gap-[13px]">
			<Text className="text-[25px] font-semibold text-content-primary">
				{highlight ? (
					<>
						{head}
						<Text className="text-primary">{highlight}</Text>
						{tail}
					</>
				) : (
					firstLine
				)}
			</Text>
			<Text className="text-[25px] font-semibold text-content-primary">
				{secondLine}
			</Text>
		</View>
	);
}
