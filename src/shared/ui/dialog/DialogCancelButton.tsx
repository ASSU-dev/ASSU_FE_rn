import type { ReactNode } from "react";
import { Pressable, type PressableProps, Text } from "react-native";

interface DialogCancelButtonProps extends PressableProps {
	children: ReactNode;
}

export function DialogCancelButton({
	children,
	...props
}: DialogCancelButtonProps) {
	return (
		<Pressable
			{...props}
			className="flex-1 py-4 rounded-lg bg-primary-tint items-center justify-center"
		>
			<Text className="text-primary font-semibold text-sm leading-5">
				{children}
			</Text>
		</Pressable>
	);
}

DialogCancelButton.displayName = "Dialog.CancelButton";
