import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { usePlaceAddressSearch } from "@/entities/place";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { colorTokens } from "@/shared/styles/tokens";
import { AddressSearchDialog } from "@/shared/ui/address-search";
import type { AddressSearchItem } from "@/shared/ui/address-search/types";
import { toSelectedPlace } from "../lib/toSelectedPlace";
import type { SelectedPlace } from "../model";

interface Props {
	label: string;
	value: SelectedPlace | null;
	onChange: (place: SelectedPlace) => void;
}

export function PlaceSearchField({ label, value, onChange }: Props) {
	const [visible, setVisible] = useState(false);
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 300);
	const { data: items = [], isFetching } = usePlaceAddressSearch(
		debouncedQuery.trim(),
	);

	const close = () => {
		setVisible(false);
		setQuery("");
	};

	const handleSelect = (item: AddressSearchItem) => {
		const place = toSelectedPlace(item);
		if (!place) {
			Alert.alert("선택할 수 없는 장소", "위치 정보가 없는 장소입니다.");
			return;
		}
		onChange(place);
		close();
	};

	return (
		<View className="gap-[5px]">
			<Text className="text-[13px] text-content-secondary px-[15px]">
				{label}
			</Text>
			<Pressable
				onPress={() => setVisible(true)}
				className="px-[15px] py-[8px]"
				style={{
					borderBottomWidth: 0.5,
					borderBottomColor: colorTokens.neutralVariant,
				}}
			>
				<Text
					className={`text-[17px] ${value ? "text-content-primary" : "text-content-secondary"}`}
					numberOfLines={1}
				>
					{value?.name ?? "가게 이름 또는 주소를 검색해주세요"}
				</Text>
				{value ? (
					<Text
						className="text-[13px] text-content-secondary"
						numberOfLines={1}
					>
						{value.roadAddress}
					</Text>
				) : null}
			</Pressable>

			<AddressSearchDialog
				visible={visible}
				items={items}
				query={query}
				selectedItemId={value?.placeId}
				placeholder="가게 이름 또는 주소 검색"
				isLoading={isFetching}
				onClose={close}
				onSelectItem={handleSelect}
				onQueryChange={setQuery}
			/>
		</View>
	);
}
