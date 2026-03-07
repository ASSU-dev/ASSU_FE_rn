import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { colorTokens } from "@/shared/styles/tokens";
import { useDialogRadioContext } from "./DialogRadioGroup";

interface DialogRadioItemProps {
	value: string;
	children: ReactNode;
}

export function DialogRadioItem({ value, children }: DialogRadioItemProps) {
	const { value: selectedValue, onChange } = useDialogRadioContext();
	const selected = selectedValue === value;

	return (
		<Pressable
			className="flex-row items-center gap-3"
			onPress={() => onChange(selected ? null : value)}
			hitSlop={8}
		>
			<View
				className="w-4 h-4 rounded-full border-2 items-center justify-center"
				style={{
					borderColor: selected
						? colorTokens.primary
						: colorTokens.contentSecondary,
				}}
			>
				{selected && (
					<View
						className="w-2 h-2 rounded-full"
						style={{ backgroundColor: colorTokens.primary }}
					/>
				)}
			</View>
			<Text className="flex-1 font-regular text-sm text-content-secondary">
				{children}
			</Text>
		</Pressable>
	);
}

DialogRadioItem.displayName = "Dialog.RadioItem";
