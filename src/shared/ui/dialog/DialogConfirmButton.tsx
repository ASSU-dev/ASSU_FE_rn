import type { ReactNode } from "react";
import { Pressable, type PressableProps, Text } from "react-native";

interface DialogConfirmButtonProps extends PressableProps {
	children: ReactNode;
}

export function DialogConfirmButton({
	children,
	disabled,
	...props
}: DialogConfirmButtonProps) {
	return (
		<Pressable
			{...props}
			disabled={disabled}
			className={`flex-1 py-4 rounded-lg bg-primary items-center justify-center ${
				disabled ? "opacity-disabled" : ""
			}`}
		>
			<Text className="text-content-inverse font-semibold text-sm leading-5">
				{children}
			</Text>
		</Pressable>
	);
}

DialogConfirmButton.displayName = "Dialog.ConfirmButton";
