import type { ReactNode } from "react";
import { Pressable, type PressableProps, Text } from "react-native";

interface Props extends PressableProps {
	//PressableProps: 버튼 컴포넌트의 속성을 정의
	children: ReactNode; // ReactNode: 모든 타입의 자식 요소를 허용
}

const SmallButton = ({ children, ...props }: Props) => {
	return (
		<Pressable
			{...props}
			className="w-[11.4rem] h-[4.1rem] rounded-lg p-[0.625rem] justify-center items-center gap-[0.625rem] bg-neutral"
		>
			<Text className="text-[0.8125rem] leading-[1.3125rem] tracking-[-0.02rem] text-content-secondary font-semibold">
				{children}
			</Text>
		</Pressable>
	);
};

export { SmallButton };
