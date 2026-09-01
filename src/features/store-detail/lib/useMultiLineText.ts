import { useState } from "react";
import type { NativeSyntheticEvent, TextLayoutEventData } from "react-native";

export function useMultiLineText() {
	const [isMultiLine, setIsMultiLine] = useState(false);

	const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
		if (e.nativeEvent.lines.length > 1) setIsMultiLine(true);
	};

	return { isMultiLine, onTextLayout };
}
