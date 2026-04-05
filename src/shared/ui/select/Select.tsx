import { DropdownSelect } from "./DropdownSelect";
import { InlineSelect } from "./InlineSelect";
import type { SelectProps } from "./types";

export function Select(props: SelectProps) {
	if (props.presentation === "inline") {
		return <InlineSelect {...props} readOnly={props.readOnly ?? false} disabled={props.disabled ?? false} placeholder={props.placeholder ?? "선택"} size={props.size ?? "md"} />;
	}

	return <DropdownSelect {...props} readOnly={props.readOnly ?? false} disabled={props.disabled ?? false} placeholder={props.placeholder ?? "선택"} size={props.size ?? "md"} />;
}
