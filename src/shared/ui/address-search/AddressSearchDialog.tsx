import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SearchBar } from "@/shared/ui/SearchBar";
import { AddressSearchOptionRow } from "./AddressSearchOptionRow";
import type { AddressSearchItem } from "./types";

type AddressSearchDialogProps = {
	visible: boolean;
	items: AddressSearchItem[];
	query: string;
	selectedItemId?: string | null;
	placeholder?: string;
	isLoading?: boolean;
	onClose: () => void;
	onSelectItem: (item: AddressSearchItem) => void;
	onQueryChange: (query: string) => void;
};

export function AddressSearchDialog({
	visible,
	items,
	query,
	selectedItemId,
	placeholder = "예 ) 상도로 360로",
	isLoading = false,
	onClose,
	onSelectItem,
	onQueryChange,
}: AddressSearchDialogProps) {
	const showEmptyState =
		!isLoading && query.trim().length > 0 && items.length === 0;

	return (
		<Modal visible={visible} animationType="slide" onRequestClose={onClose}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View className="flex-1 bg-canvas pt-[50px]">
					<SearchBar
						mode="active"
						value={query}
						onChangeText={onQueryChange}
						onBack={onClose}
						autoFocus
						placeholder={placeholder}
						iconVariant="location"
					/>

					<ScrollView
						style={{ flex: 1 }}
						className="mt-[14px] px-screen-m"
						keyboardShouldPersistTaps="never"
					>
						{showEmptyState ? (
							<Text className="mt-[40px] text-center font-regular text-[14px] leading-[1.5] text-content-secondary">
								검색 결과가 없어요
							</Text>
						) : (
							items.map((item, index) => (
								<AddressSearchOptionRow
									key={item.id}
									label={item.label}
									selected={selectedItemId === item.id}
									showDivider={index < items.length - 1}
									onPress={() => onSelectItem(item)}
								/>
							))
						)}
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}
