import { createContext, useContext, type ReactNode } from "react";
import { View } from "react-native";
import type { DialogSelectContextValue } from "./types";

const DialogSelectContext = createContext<DialogSelectContextValue | null>(null);

export function useDialogSelectContext(): DialogSelectContextValue {
	const ctx = useContext(DialogSelectContext);
	if (!ctx) {
		throw new Error("Dialog.SelectButton must be used inside Dialog.SelectGroup");
	}
	return ctx;
}

interface DialogSelectGroupProps {
	value: string | null;
	onChange: (value: string | null) => void;
	children: ReactNode;
}

export function DialogSelectGroup({
	value,
	onChange,
	children,
}: DialogSelectGroupProps) {
	return (
		<DialogSelectContext.Provider value={{ value, onChange }}>
			<View className="mt-5 gap-[7px]">{children}</View>
		</DialogSelectContext.Provider>
	);
}

DialogSelectGroup.displayName = "Dialog.SelectGroup";
