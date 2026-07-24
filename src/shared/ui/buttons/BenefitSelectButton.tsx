import { Pressable, Text } from "react-native";

interface Props {
	title: string;
	description: string;
	isSelected: boolean;
	dimmed?: boolean;
	onPress: () => void;
}

const BenefitSelectButton = ({
	title,
	description,
	isSelected,
	dimmed = false,
	onPress,
}: Props) => {
	return (
		<Pressable
			onPress={onPress}
			className={`
        w-[21.5625rem] py-[0.6875rem] flex flex-col items-center rounded-[0.625rem] border-[0.5px]
        ${dimmed ? "opacity-60" : ""}
        ${
					isSelected
						? "border-primary bg-primary-tint"
						: "border-content-secondary bg-neutral"
				}
      `}
		>
			<Text
				className={`
          self-stretch text-center text-[0.875rem] leading-[1.6875rem] tracking-[0.01563rem] font-semibold
          ${isSelected ? "text-primary" : "text-content-primary"}
        `}
			>
				{title}
			</Text>
			<Text
				className={`
          self-stretch text-center text-[0.875rem] leading-[1.3125rem] tracking-[-0.02rem] font-regular
          ${isSelected ? "text-primary" : "text-content-secondary"}
        `}
			>
				{description}
			</Text>
		</Pressable>
	);
};

export { BenefitSelectButton };
