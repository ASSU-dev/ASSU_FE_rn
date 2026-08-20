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
			className="px-4 py-3 rounded-lg justify-center items-center gap-[10px] bg-neutral"
		>
			<Text className="text-[13px] leading-[21px] tracking-[-0.32px] text-content-secondary font-semibold">
				{children}
			</Text>
		</Pressable>
	);
};

export { SmallButton };
