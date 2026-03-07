export interface DialogControlContextValue {
	value: string | null;
	onChange: (value: string | null) => void;
}

export type DialogRadioContextValue = DialogControlContextValue;

export type DialogSelectContextValue = DialogControlContextValue;