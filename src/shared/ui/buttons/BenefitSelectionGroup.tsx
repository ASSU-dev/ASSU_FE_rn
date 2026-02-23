import { useState } from "react";
import { View } from "react-native";
import { BenefitSelectButton } from "./BenefitSelectButton";

interface BenefitOption {
	title: string;
	description: string;
}

interface Props {
	options: BenefitOption[];
	onSelect?: (index: number) => void;
}

const BenefitSelectionGroup = ({ options, onSelect }: Props) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handlePress = (index: number) => {
		const nextIndex = selectedIndex === index ? null : index;
		setSelectedIndex(nextIndex);
		if (nextIndex !== null) {
			onSelect?.(nextIndex);
		}
	};

	return (
		<View className="items-center gap-[0.625rem]">
			{options.map((option, index) => (
				<BenefitSelectButton
					key={`${option.title}-${index}`}
					title={option.title}
					description={option.description}
					isSelected={selectedIndex === index}
					onPress={() => handlePress(index)}
				/>
			))}
		</View>
	);
};

export { BenefitSelectionGroup };
export type { BenefitOption };
