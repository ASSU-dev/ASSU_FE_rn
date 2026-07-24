import { useState } from "react";
import { colorTokens } from "@/shared/styles/tokens";

export function useFocusBorder() {
	const [focusedField, setFocusedField] = useState<string | null>(null);
	return {
		borderColor: (field: string) =>
			focusedField === field ? colorTokens.primary : colorTokens.neutralVariant,
		onFocus: (field: string) => () => setFocusedField(field),
		onBlur: () => setFocusedField(null),
	};
}
