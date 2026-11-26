import type { AddressSearchItem } from "@/shared/ui/address-search/types";
import type { SelectedPlace } from "../model/types";

/**
 * 장소 검색 결과를 서버의 selectedPlace 형태로 바꾼다.
 * 서버가 모든 필드를 필수로 받으므로 좌표나 이름이 없는 결과는 선택할 수 없다.
 */
export function toSelectedPlace(item: AddressSearchItem): SelectedPlace | null {
	const { latitude, longitude } = item;
	const name = item.name?.trim() || item.label;

	if (!item.id || !name || latitude === undefined || longitude === undefined) {
		return null;
	}

	const address = item.address?.trim() || item.roadAddress?.trim() || name;

	return {
		placeId: item.id,
		name,
		address,
		roadAddress: item.roadAddress?.trim() || address,
		latitude,
		longitude,
	};
}
