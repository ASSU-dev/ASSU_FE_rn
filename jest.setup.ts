import * as matchers from "@testing-library/react-native/matchers";
expect.extend(matchers);
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () =>
	require("react-native-reanimated/mock"),
);
