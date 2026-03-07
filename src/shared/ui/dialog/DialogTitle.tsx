import type { ReactNode } from "react";
import { Text } from "react-native";

interface DialogTitleProps {
	children: ReactNode;
}

export function DialogTitle({ children }: DialogTitleProps) {
	return (
		<Text className="text-xl font-semibold text-content-primary pr-8 mb-[7px]">
			{children}
		</Text>
	);
}

DialogTitle.displayName = "Dialog.Title";
