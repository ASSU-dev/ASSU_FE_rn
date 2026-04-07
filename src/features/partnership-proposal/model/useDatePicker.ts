import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";

type DateField = "startDate" | "endDate";

export function useDatePicker(
	onSelect: (field: DateField, date: string) => void,
) {
	const [dateField, setDateField] = useState<DateField | null>(null);
	const [tempDate, setTempDate] = useState(new Date());

	const open = (field: DateField, current: string | null) => {
		setTempDate(current ? new Date(current) : new Date());
		setDateField(field);
	};

	const onChange = (event: DateTimePickerEvent, selected?: Date) => {
		if (Platform.OS === "android") {
			setDateField(null);
			if (event.type === "set" && selected && dateField) {
				onSelect(dateField, selected.toISOString().slice(0, 10));
			}
		} else {
			if (selected) setTempDate(selected);
		}
	};

	const confirm = () => {
		if (dateField) onSelect(dateField, tempDate.toISOString().slice(0, 10));
		setDateField(null);
	};

	const dismiss = () => setDateField(null);

	return { dateField, tempDate, open, onChange, confirm, dismiss };
}
