import { useQuery } from "@tanstack/react-query";

import type {
	PopularStore,
	SearchResultStore,
	StoreMarker,
} from "@/entities/store";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";
import type { AddressSearchItem } from "@/shared/ui/address-search/types";

export interface MapViewport {
	lng1: number;
	lat1: number;
	lng2: number;
	lat2: number;
	lng3: number;
	lat3: number;
	lng4: number;
	lat4: number;
}

interface PlaceSuggestionDto {
	placeId: string;
	name: string;
	category?: string;
	address?: string;
	roadAddress?: string;
	phone?: string;
	placeUrl?: string;
	latitude?: number;
	longitude?: number;
	distance?: number;
}

type UnknownRecord = Record<string, unknown>;

const SOONGSIL_VIEWPORT: MapViewport = {
	lng1: 126.9472,
	lat1: 37.5063,
	lng2: 126.9672,
	lat2: 37.5063,
	lng3: 126.9672,
	lat3: 37.4863,
	lng4: 126.9472,
	lat4: 37.4863,
};

function isRecord(value: unknown): value is UnknownRecord {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(record: UnknownRecord, keys: string[]): string | undefined {
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "string" && value.length > 0) return value;
		if (typeof value === "number") return String(value);
	}
	return undefined;
}

function getNumber(record: UnknownRecord, keys: string[]): number | undefined {
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "number") return value;
		if (typeof value === "string") {
			const parsed = Number(value);
			if (!Number.isNaN(parsed)) return parsed;
		}
	}
	return undefined;
}

function getBoolean(
	record: UnknownRecord,
	keys: string[],
): boolean | undefined {
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "boolean") return value;
	}
	return undefined;
}

function pickList(value: unknown): unknown[] {
	if (Array.isArray(value)) return value;
	if (!isRecord(value)) return [];

	for (const key of [
		"items",
		"content",
		"stores",
		"places",
		"data",
		"result",
	]) {
		const nested = value[key];
		if (Array.isArray(nested)) return nested;
		if (isRecord(nested)) {
			const nestedItems = pickList(nested);
			if (nestedItems.length > 0) return nestedItems;
		}
	}

	const id = getString(value, [
		"storeId",
		"partnerId",
		"adminId",
		"id",
		"placeId",
		"kakaoId",
	]);
	const name = getString(value, ["name", "storeName", "placeName"]);
	if (id && name) return [value];

	const values = Object.values(value);
	if (
		values.length > 0 &&
		values.every((item) => Array.isArray(item) || isRecord(item))
	) {
		return values.flatMap((item) => (Array.isArray(item) ? item : [item]));
	}

	return [];
}

function toSearchResultStore(value: unknown): SearchResultStore | null {
	if (!isRecord(value)) return null;

	const storeId = getString(value, ["storeId"]);
	const partnerId = getString(value, ["partnerId"]);
	const adminId = getString(value, ["adminId"]);
	const id =
		storeId ??
		partnerId ??
		adminId ??
		getString(value, ["id", "placeId", "kakaoId"]);
	const name = getString(value, ["name", "storeName", "placeName"]);
	if (!id || !name) return null;
	const partnershipId = getString(value, ["partnershipId"]);

	return {
		id,
		name,
		storeId,
		partnerId,
		adminId,
		imageUri: getString(value, ["imageUri", "imageUrl", "storeImageUrl"]),
		tag:
			getString(value, ["tag", "adminName", "affiliation", "category"]) ??
			getPartnershipAdminName(value.partnerships),
		benefit: getStoreBenefit(value),
		address: getString(value, ["address", "roadAddress", "storeAddress"]),
		rate: getNumber(value, ["rate", "rating", "score"]),
		latitude: getNumber(value, ["latitude", "lat", "y"]),
		longitude: getNumber(value, ["longitude", "lng", "lon", "x"]),
		profileUrl: getString(value, ["profileUrl", "placeUrl"]),
		phoneNumber: getString(value, ["phoneNumber", "phone"]),
		isPartner:
			getBoolean(value, [
				"hasPartner",
				"isPartnered",
				"isPartner",
				"partner",
			]) ?? partnershipId !== undefined,
		partnershipId,
		partnershipStartDate: getString(value, [
			"partnershipStartDate",
			"startDate",
		]),
		partnershipEndDate: getString(value, ["partnershipEndDate", "endDate"]),
	};
}

function toAddressSearchItem(
	dto: PlaceSuggestionDto,
): AddressSearchItem | null {
	const label = dto.roadAddress || dto.address || dto.name;
	if (!dto.placeId || !label) return null;

	return {
		id: dto.placeId,
		label,
		latitude: dto.latitude,
		longitude: dto.longitude,
	};
}

function getBenefitText(value: unknown): string | undefined {
	if (typeof value === "string" && value.trim().length > 0) return value.trim();
	if (Array.isArray(value)) {
		for (const item of value) {
			const text = getBenefitText(item);
			if (text) return text;
		}
		return undefined;
	}
	if (!isRecord(value)) return undefined;

	const direct = getString(value, [
		"benefitDescription",
		"description",
		"content",
		"note",
		"goodsName",
	]);
	if (direct) return direct;

	const discountRate = getNumber(value, ["discountRate"]);
	if (discountRate !== undefined) return `${discountRate}% 할인`;

	return getBenefitText(value.benefits) ?? getBenefitText(value.goods);
}

function getStoreBenefit(value: UnknownRecord): string | undefined {
	return (
		getString(value, [
			"benefit",
			"benefitDescription",
			"partnershipBenefit",
			"description",
		]) ?? getBenefitText(value.partnerships)
	);
}

function getPartnershipAdminName(value: unknown): string | undefined {
	if (!Array.isArray(value)) return undefined;

	for (const partnership of value) {
		if (!isRecord(partnership)) continue;
		const adminName = getString(partnership, ["adminName"]);
		if (adminName) return adminName;
	}

	return undefined;
}

function toStoreMarker(value: unknown): StoreMarker | null {
	if (!isRecord(value)) return null;

	const storeId = getString(value, ["storeId"]);
	const partnerId = getString(value, ["partnerId"]);
	const adminId = getString(value, ["adminId"]);
	const id =
		storeId ??
		partnerId ??
		adminId ??
		getString(value, ["id", "placeId", "kakaoId"]);
	const name = getString(value, ["name", "storeName", "placeName"]);
	const latitude = getNumber(value, ["latitude", "lat", "y"]);
	const longitude = getNumber(value, ["longitude", "lng", "lon", "x"]);
	if (!id || !name || latitude === undefined || longitude === undefined) {
		return null;
	}

	return {
		id,
		name,
		storeId,
		partnerId,
		adminId,
		address: getString(value, ["address", "roadAddress", "storeAddress"]) ?? "",
		latitude,
		longitude,
		count: getNumber(value, ["count", "usageCount"]),
		hasPartner:
			getBoolean(value, [
				"hasPartner",
				"isPartner",
				"partner",
				"isPartnered",
			]) ?? false,
		rate: getNumber(value, ["rate", "rating", "score"]) ?? 0,
		benefit: getStoreBenefit(value),
		imageUri: getString(value, [
			"imageUri",
			"imageUrl",
			"storeImageUrl",
			"profileImageUrl",
			"thumbnailUrl",
		]),
		profileUrl: getString(value, ["profileUrl", "placeUrl"]),
		phoneNumber: getString(value, ["phoneNumber", "phone"]),
		partnershipId: getString(value, ["partnershipId"]),
		partnershipStartDate: getString(value, ["partnershipStartDate"]),
		partnershipEndDate: getString(value, ["partnershipEndDate"]),
	};
}

async function fetchNearbyRaw(viewport: MapViewport): Promise<unknown[]> {
	if (__DEV__) console.log("[fetchNearbyRaw] 요청:", "/map/nearby", viewport);
	const res = await apiInstance.get<BaseResponse<unknown>>("/map/nearby", {
		params: viewport,
	});
	const responseResult = res.data?.result;
	const result = pickList(responseResult);
	if (__DEV__)
		console.log("[fetchNearbyRaw] 응답:", {
			count: result.length,
			result: responseResult,
		});
	return result;
}

const fetchPopularStores = async (): Promise<PopularStore[]> => {
	const nearby = await fetchNearbyRaw(SOONGSIL_VIEWPORT);
	const popularStores = nearby
		.map(toSearchResultStore)
		.filter((store): store is SearchResultStore => store !== null)
		.slice(0, 8)
		.map((store) => ({
			id: store.id,
			name: store.name,
			category: store.tag,
		}));
	if (__DEV__)
		console.log("[fetchPopularStores] 응답:", {
			count: popularStores.length,
			items: popularStores,
		});
	return popularStores;
};

const fetchSearchStores = async (
	query: string,
): Promise<SearchResultStore[]> => {
	if (__DEV__)
		console.log("[fetchSearchStores] 요청:", {
			endpoint: "/map/search",
			searchKeyword: query,
		});
	const res = await apiInstance.get<BaseResponse<unknown>>("/map/search", {
		params: { searchKeyword: query },
	});
	const stores = pickList(res.data?.result)
		.map(toSearchResultStore)
		.filter((store): store is SearchResultStore => store !== null);
	if (__DEV__)
		console.log("[fetchSearchStores] 응답:", {
			count: stores.length,
			items: stores,
		});
	return stores;
};

async function fetchPlaceAddresses(
	query: string,
): Promise<AddressSearchItem[]> {
	if (__DEV__)
		console.log("[fetchPlaceAddresses] 요청:", "/map/place", {
			searchKeyword: query,
			limit: 10,
		});
	const res = await apiInstance.get<BaseResponse<PlaceSuggestionDto[] | null>>(
		"/map/place",
		{ params: { searchKeyword: query, limit: 10 } },
	);
	const places = res.data?.result;
	const items = (Array.isArray(places) ? places : [])
		.map(toAddressSearchItem)
		.filter((item): item is AddressSearchItem => item !== null);
	if (__DEV__)
		console.log("[fetchPlaceAddresses] 응답:", {
			count: items.length,
			items,
		});
	return items;
}

async function fetchNearbyStores(
	viewport: MapViewport,
): Promise<StoreMarker[]> {
	const nearby = await fetchNearbyRaw(viewport);
	const markers = nearby
		.map(toStoreMarker)
		.filter((marker): marker is StoreMarker => marker !== null);
	if (__DEV__)
		console.log("[fetchNearbyStores] 응답:", {
			count: markers.length,
			items: markers,
		});
	return markers;
}

export function usePopularStores() {
	return useQuery<PopularStore[]>({
		queryKey: ["map", "nearby", "popular"],
		queryFn: fetchPopularStores,
		staleTime: 1000 * 60 * 5,
	});
}

export function useSearchStores(query: string) {
	return useQuery<SearchResultStore[]>({
		queryKey: ["map", "search", query],
		queryFn: () => fetchSearchStores(query),
		enabled: query.trim().length > 0,
		staleTime: 1000 * 60,
	});
}

export function useNearbyStores(viewport: MapViewport | null) {
	return useQuery<StoreMarker[]>({
		queryKey: ["map", "nearby", viewport],
		queryFn: () => fetchNearbyStores(viewport as MapViewport),
		enabled: viewport !== null,
		staleTime: 1000 * 60,
	});
}

export function usePlaceAddressSearch(query: string) {
	return useQuery<AddressSearchItem[]>({
		queryKey: ["map", "place", "address", query],
		queryFn: () => fetchPlaceAddresses(query),
		enabled: query.trim().length > 0,
		staleTime: 1000 * 60,
	});
}
