import { createContext, type ReactNode, useContext } from "react";
import { View } from "react-native";
import type { DialogRadioContextValue } from "./types";

const DialogRadioContext = createContext<DialogRadioContextValue | null>(null);

export function useDialogRadioContext(): DialogRadioContextValue {
	const ctx = useContext(DialogRadioContext);
	if (!ctx) {
		throw new Error("Dialog.RadioItem must be used inside Dialog.RadioGroup");
	}
	return ctx;
}

interface DialogRadioGroupProps {
	value: string | null;
	onChange: (value: string | null) => void;
	children: ReactNode;
}

export function DialogRadioGroup({
	value,
	onChange,
	children,
}: DialogRadioGroupProps) {
	return (
		<DialogRadioContext.Provider value={{ value, onChange }}>
			<View className="mt-3 gap-[7px]">{children}</View>
		</DialogRadioContext.Provider>
	);
}

DialogRadioGroup.displayName = "Dialog.RadioGroup";
