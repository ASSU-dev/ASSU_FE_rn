import { Controller, type FieldValues } from "react-hook-form";
import { Checkbox } from "./Checkbox";
import type { CheckboxFieldProps } from "./types";

export function CheckboxField<T extends FieldValues>({
	control,
	name,
	label,
	showDivider = false,
}: CheckboxFieldProps<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => {
				const isChecked = Boolean(field.value);

				return (
					<Checkbox
						checked={isChecked}
						label={label}
						showDivider={showDivider}
						onPress={() => field.onChange(!isChecked)}
					/>
				);
			}}
		/>
	);
}
