import { useEffect, useMemo, useState } from "react";
import { Modal, View } from "react-native";
import { SearchBar } from "@/shared/ui/SearchBar";
import { AddressSearchOptionRow } from "./AddressSearchOptionRow";
import type { AddressSearchItem } from "./types";

type AddressSearchDialogProps = {
	visible: boolean;
	items: AddressSearchItem[];
	selectedItemId?: string | null;
	placeholder?: string;
	onClose: () => void;
	onSelectItem: (item: AddressSearchItem) => void;
};

export function AddressSearchDialog({
	visible,
	items,
	selectedItemId,
	placeholder = "예 ) 상도로 360로",
	onClose,
	onSelectItem,
}: AddressSearchDialogProps) {
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (visible) {
			setQuery("");
		}
	}, [visible]);

	const filteredItems = useMemo(() => {
		const normalizedQuery = query.trim();
		if (normalizedQuery.length === 0) {
			return items;
		}

		return items.filter((item) => item.label.includes(normalizedQuery));
	}, [items, query]);

	return (
		<Modal visible={visible} animationType="slide" onRequestClose={onClose}>
			<View className="flex-1 bg-canvas pt-[60px]">
				<SearchBar
					mode="active"
					value={query}
					onChangeText={setQuery}
					onBack={onClose}
					autoFocus
					placeholder={placeholder}
					iconVariant="location"
				/>

				<View className="mt-[14px] px-screen-m">
					{filteredItems.map((item, index) => (
						<AddressSearchOptionRow
							key={item.id}
							label={item.label}
							selected={selectedItemId === item.id}
							showDivider={index < filteredItems.length - 1}
							onPress={() => {
								onSelectItem(item);
								setQuery("");
							}}
						/>
					))}
				</View>
			</View>
		</Modal>
	);
}
