import type { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { useDialogSelectContext } from "./DialogSelectGroup";

interface DialogSelectButtonProps {
	value: string;
	children: ReactNode;
}

export function DialogSelectButton({
	value,
	children,
}: DialogSelectButtonProps) {
	const { value: selectedValue, onChange } = useDialogSelectContext();
	const selected = selectedValue === value;

	return (
		<Pressable
			className={`w-full py-4 rounded-xl items-center justify-center border-[0.5px] bg-neutral ${
				selected ? "border-primary" : "border-transparent"
			}`}
			onPress={() => onChange(selected ? null : value)}
		>
			<Text
				className={`font-semibold text-xs leading-5 ${
					selected ? "text-primary" : "text-content-secondary"
				}`}
			>
				{children}
			</Text>
		</Pressable>
	);
}

DialogSelectButton.displayName = "Dialog.SelectButton";
