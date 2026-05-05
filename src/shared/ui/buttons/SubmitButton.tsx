import type { ReactNode } from "react";
import { Pressable, type PressableProps, Text } from "react-native";

interface Props extends PressableProps {
	children: ReactNode;
}

const MediumButton = ({ children, ...props }: Props) => {
	return (
		<Pressable
			{...props}
			//논의: 345px 대신 rem을 사용하면 크기가 다르게 나옴
			className="w-[345px] px-[1rem] py-[1.12rem] justify-center items-center gap-[0.625rem] rounded-[0.75rem] bg-primary"
			style={props.disabled ? { opacity: 0.3 } : undefined}
		>
			<Text className="text-center text-[1.25rem] leading-[1.25rem] tracking-[0.01563rem] font-bold text-content-inverse">
				{children}
			</Text>
		</Pressable>
	);
};

export { MediumButton };
