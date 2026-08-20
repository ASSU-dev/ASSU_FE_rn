import type { ReactNode } from "react";
import {
	ScrollView,
	type ScrollViewProps,
	type StyleProp,
	View,
	type ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { type Edge, SafeAreaView } from "react-native-safe-area-context";

interface PageLayoutProps {
	children: ReactNode;
	header?: ReactNode;
	scrollable?: boolean;
	keyboardAware?: boolean;
	withTopInset?: boolean;
	withBottomInset?: boolean;
	className?: string;
	contentContainerClassName?: string;
	contentContainerStyle?: StyleProp<ViewStyle>;
	keyboardDismissMode?: ScrollViewProps["keyboardDismissMode"];
}

export function PageLayout({
	children,
	header,
	scrollable = false,
	keyboardAware = false,
	withTopInset = true,
	withBottomInset = false,
	className = "flex-1 bg-canvas",
	contentContainerClassName,
	contentContainerStyle,
	keyboardDismissMode,
}: PageLayoutProps) {
	const edges: Edge[] = [];

	if (withTopInset) {
		edges.push("top");
	}

	if (withBottomInset) {
		edges.push("bottom");
	}

	if (scrollable) {
		const ScrollComponent = keyboardAware
			? KeyboardAwareScrollView
			: ScrollView;
		return (
			<SafeAreaView edges={edges} className={className}>
				<ScrollComponent
					style={{ flex: 1 }}
					contentContainerClassName={contentContainerClassName}
					contentContainerStyle={contentContainerStyle}
					keyboardDismissMode={keyboardDismissMode}
					{...(keyboardAware ? { bottomOffset: 24 } : {})}
				>
					{children}
				</ScrollComponent>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView edges={edges} className={className}>
			{header}
			<View className={contentContainerClassName} style={contentContainerStyle}>
				{children}
			</View>
		</SafeAreaView>
	);
}
