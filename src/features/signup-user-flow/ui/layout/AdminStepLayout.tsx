import type { ReactNode } from "react";
import { View } from "react-native";
import { SignupStepTitle } from "../SignupStepTitle";

type AdminStepLayoutProps = {
	children: ReactNode;
	contentGapClassName?: string;
	firstLine: string;
	secondLine: string;
};

export function AdminStepLayout({
	children,
	contentGapClassName = "gap-[56px]",
	firstLine,
	secondLine,
}: AdminStepLayoutProps) {
	return (
		<View className={`mt-[46px] ${contentGapClassName}`}>
			<SignupStepTitle firstLine={firstLine} secondLine={secondLine} />
			{children}
		</View>
	);
}
