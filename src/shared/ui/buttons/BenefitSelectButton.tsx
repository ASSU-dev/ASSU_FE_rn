import { useState } from "react";
import { Pressable, Text } from "react-native";

interface Props {
	title: string;
	description: string;
	onPress?: () => void;
}

const LargeButton = ({ title, description, onPress }: Props) => {
	const [isSelected, setIsSelected] = useState(false);

	const handlePress = () => {
		setIsSelected(!isSelected);
		onPress?.();
	};

	return (
		<Pressable
			onPress={handlePress}
			className={`
        w-[21.5625rem] py-[0.6875rem] flex flex-col items-center rounded-[0.625rem] border-[0.5px]
        ${
					isSelected
						? "border-[var(--color-primary)] bg-[var(--color-primary-tint)]"
						: "border-[var(--color-content-secondary)] bg-[var(--color-neutral)]"
				}
      `}
		>
			<Text
				className={`
          self-stretch text-center text-[0.875rem] leading-[1.6875rem] tracking-[0.01563rem] font-semibold
          ${
						isSelected
							? "text-[var(--color-primary)]"
							: "text-[var(--color-content-primary)]"
					}
        `}
			>
				{title}
			</Text>
			<Text
				className={`
          self-stretch text-center text-[0.875rem] leading-[1.3125rem] tracking-[-0.02rem] font-regular
          ${
						isSelected
							? "text-[var(--color-primary)]"
							: "text-[var(--color-content-secondary)]"
					}
        `}
			>
				{description}
			</Text>
		</Pressable>
	);
};

export { LargeButton };
