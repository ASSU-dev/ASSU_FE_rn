import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "map_recent_searches";
const MAX_RECENT_SEARCHES = 10;

async function readRecentSearches(): Promise<string[]> {
	try {
		const raw = await SecureStore.getItemAsync(STORAGE_KEY);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		return Array.isArray(parsed)
			? parsed.filter((item): item is string => typeof item === "string")
			: [];
	} catch {
		return [];
	}
}

function writeRecentSearches(keywords: string[]) {
	SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(keywords)).catch(
		() => {},
	);
}

/** 지도 매장 검색 최근 검색어 — 서버 없이 기기에만 저장 (최신순, 중복 제거, 최대 10개) */
export function useRecentSearches() {
	const [recentSearches, setRecentSearches] = useState<string[]>([]);

	useEffect(() => {
		let isActive = true;
		readRecentSearches().then((keywords) => {
			if (isActive) setRecentSearches(keywords);
		});
		return () => {
			isActive = false;
		};
	}, []);

	const updateRecentSearches = useCallback(
		(updater: (prev: string[]) => string[]) => {
			setRecentSearches((prev) => {
				const next = updater(prev);
				writeRecentSearches(next);
				return next;
			});
		},
		[],
	);

	const addRecentSearch = useCallback(
		(keyword: string) => {
			const trimmed = keyword.trim();
			if (!trimmed) return;
			updateRecentSearches((prev) =>
				[trimmed, ...prev.filter((item) => item !== trimmed)].slice(
					0,
					MAX_RECENT_SEARCHES,
				),
			);
		},
		[updateRecentSearches],
	);

	const removeRecentSearch = useCallback(
		(keyword: string) => {
			updateRecentSearches((prev) => prev.filter((item) => item !== keyword));
		},
		[updateRecentSearches],
	);

	const clearRecentSearches = useCallback(() => {
		updateRecentSearches(() => []);
	}, [updateRecentSearches]);

	return {
		recentSearches,
		addRecentSearch,
		removeRecentSearch,
		clearRecentSearches,
	};
}
