import type { ReactNode } from "react";
import { View } from "react-native";

interface DialogActionsProps {
	children: ReactNode;
}

export function DialogActions({ children }: DialogActionsProps) {
	return <View className="flex-row gap-2 mt-5">{children}</View>;
}

DialogActions.displayName = "Dialog.Actions";
