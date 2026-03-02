export type SearchBarDefaultProps = {
	mode: "default";
	placeholder?: string;
	onPress: () => void;
};

export type SearchBarActiveProps = {
	mode: "active";
	placeholder?: string;
	value: string;
	onChangeText: (text: string) => void;
	onBack: () => void;
	autoFocus?: boolean;
};

export type SearchBarProps = SearchBarDefaultProps | SearchBarActiveProps;
