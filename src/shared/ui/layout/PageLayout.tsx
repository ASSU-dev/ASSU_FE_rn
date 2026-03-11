import type { ReactNode } from "react";
import { ScrollView, type StyleProp, View, type ViewStyle } from "react-native";
import { type Edge, SafeAreaView } from "react-native-safe-area-context";

interface PageLayoutProps {
	children: ReactNode;
	scrollable?: boolean;
	withTopInset?: boolean;
	withBottomInset?: boolean;
	className?: string;
	contentContainerClassName?: string;
	contentContainerStyle?: StyleProp<ViewStyle>;
}

export function PageLayout({
	children,
	scrollable = false,
	withTopInset = true,
	withBottomInset = false,
	className = "flex-1 bg-canvas",
	contentContainerClassName,
	contentContainerStyle,
}: PageLayoutProps) {
	const edges: Edge[] = [];

	if (withTopInset) {
		edges.push("top");
	}

	if (withBottomInset) {
		edges.push("bottom");
	}

	if (scrollable) {
		return (
			<SafeAreaView edges={edges} className={className}>
				<ScrollView
					className="flex-1"
					contentContainerClassName={contentContainerClassName}
					contentContainerStyle={contentContainerStyle}
				>
					{children}
				</ScrollView>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView edges={edges} className={className}>
			<View className={contentContainerClassName} style={contentContainerStyle}>
				{children}
			</View>
		</SafeAreaView>
	);
}
