import { useQuery } from "@tanstack/react-query";

import type {
	PopularStore,
	SearchResultStore,
	StoreMarker,
} from "@/entities/store";
import type { BaseResponse } from "@/shared/api";
import { apiInstance } from "@/shared/api";

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
	}

	return [];
}

function toSearchResultStore(value: unknown): SearchResultStore | null {
	if (!isRecord(value)) return null;

	const id = getString(value, ["id", "storeId", "placeId", "kakaoId"]);
	const name = getString(value, ["name", "storeName", "placeName"]);
	if (!id || !name) return null;
	const hasPartnership =
		value.partnershipId !== undefined || value.partnership !== undefined;

	return {
		id,
		name,
		imageUri: getString(value, ["imageUri", "imageUrl", "storeImageUrl"]),
		tag: getString(value, ["tag", "adminName", "affiliation", "category"]),
		benefit: getString(value, [
			"benefit",
			"benefitDescription",
			"partnershipBenefit",
			"description",
		]),
		address: getString(value, ["address", "roadAddress", "storeAddress"]),
		isPartner: getBoolean(value, ["isPartner", "partner"]) ?? hasPartnership,
		partnershipStartDate: getString(value, [
			"partnershipStartDate",
			"startDate",
		]),
		partnershipEndDate: getString(value, ["partnershipEndDate", "endDate"]),
	};
}

function toPlaceSearchResult(dto: PlaceSuggestionDto): SearchResultStore {
	return {
		id: dto.placeId,
		name: dto.name,
		tag: dto.category,
		address: dto.roadAddress || dto.address,
		isPartner: false,
	};
}

function toStoreMarker(value: unknown): StoreMarker | null {
	if (!isRecord(value)) return null;

	const id = getString(value, ["id", "storeId", "placeId", "kakaoId"]);
	const name = getString(value, ["name", "storeName", "placeName"]);
	const latitude = getNumber(value, ["latitude", "lat", "y"]);
	const longitude = getNumber(value, ["longitude", "lng", "lon", "x"]);
	if (!id || !name || latitude === undefined || longitude === undefined) {
		return null;
	}

	return {
		id,
		name,
		address: getString(value, ["address", "roadAddress", "storeAddress"]) ?? "",
		latitude,
		longitude,
		count: getNumber(value, ["count", "usageCount"]),
	};
}

function dedupeStores(stores: SearchResultStore[]): SearchResultStore[] {
	const seen = new Set<string>();
	return stores.filter((store) => {
		const key = `${store.id}:${store.name}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

async function fetchNearbyRaw(viewport: MapViewport): Promise<unknown[]> {
	if (__DEV__) console.log("[fetchNearbyRaw] 요청:", "/map/nearby", viewport);
	const res = await apiInstance.get<BaseResponse<unknown>>("/map/nearby", {
		params: viewport,
	});
	const result = pickList(res.data.result);
	if (__DEV__)
		console.log("[fetchNearbyRaw] 응답:", {
			count: result.length,
			result: res.data.result,
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
			search: { endpoint: "/map/search", searchKeyword: query },
			place: { endpoint: "/map/place", searchKeyword: query, limit: 10 },
		});
	const [storeSearchResult, placeSearchResult] = await Promise.allSettled([
		apiInstance.get<BaseResponse<unknown>>("/map/search", {
			params: { searchKeyword: query },
		}),
		apiInstance.get<BaseResponse<PlaceSuggestionDto[]>>("/map/place", {
			params: { searchKeyword: query, limit: 10 },
		}),
	]);

	const stores =
		storeSearchResult.status === "fulfilled"
			? pickList(storeSearchResult.value.data.result)
					.map(toSearchResultStore)
					.filter((store): store is SearchResultStore => store !== null)
			: [];
	const places =
		placeSearchResult.status === "fulfilled"
			? (Array.isArray(placeSearchResult.value.data.result)
					? placeSearchResult.value.data.result
					: []
				).map(toPlaceSearchResult)
			: [];

	const results = dedupeStores([...stores, ...places]);
	if (__DEV__)
		console.log("[fetchSearchStores] 응답:", {
			storeCount: stores.length,
			placeCount: places.length,
			totalCount: results.length,
			items: results,
		});
	return results;
};

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
