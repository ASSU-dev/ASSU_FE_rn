import { useState } from "react";
import type { NativeSyntheticEvent, TextLayoutEventData } from "react-native";

// (가게 상세 정보 화면 내) 제휴 목록의 각 아이템의 텍스트가 여러 줄인지 여부를 확인하는 훅
export function useMultiLineText() {
	const [isMultiLine, setIsMultiLine] = useState(false);

	const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
		if (e.nativeEvent.lines.length > 1) setIsMultiLine(true);
	};

	return { isMultiLine, onTextLayout };
}
