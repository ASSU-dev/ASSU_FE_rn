import type { ReactNode } from "react";
import { Pressable, type PressableProps, Text } from "react-native";

interface Props extends PressableProps {
	children: ReactNode;
}

const MediumButton = ({ children, ...props }: Props) => {
	return (
		<Pressable
			{...props}
			className="w-[21.5625rem] px-[6.25rem] py-[1.12rem] justify-center items-center gap-[0.625rem] rounded-[0.75rem] bg-primary"
		>
			<Text className="text-center text-[1.25rem] leading-[1.25rem] tracking-[0.01563rem] font-bold text-content-inverse">
				{children}
			</Text>
		</Pressable>
	);
};

export { MediumButton };
