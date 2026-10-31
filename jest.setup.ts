import { jest } from "@jest/globals";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () =>
	require("react-native-reanimated/mock"),
);

jest.mock("react-native-safe-area-context", () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const React = require("react");
	const insets = { top: 0, right: 0, bottom: 0, left: 0 };
	const frame = { x: 0, y: 0, width: 320, height: 640 };
	// SafeAreaProvider/SafeAreaView — passthrough that renders children directly.
	// Default native fallback renders `<RNCSafeAreaProvider />` without children in Jest.
	const passthrough = (props: { children?: unknown }) =>
		props.children ?? null;
	return {
		SafeAreaProvider: passthrough,
		SafeAreaView: passthrough,
		SafeAreaInsetsContext: React.createContext(insets),
		SafeAreaFrameContext: React.createContext(frame),
		useSafeAreaInsets: () => insets,
		useSafeAreaFrame: () => frame,
		initialWindowMetrics: { frame, insets },
	};
});
