import type { ReactNode } from "react";
import { View } from "react-native";

interface DialogContentProps {
	children: ReactNode;
}

export function DialogContent({ children }: DialogContentProps) {
	return <View>{children}</View>;
}

DialogContent.displayName = "Dialog.Content";
