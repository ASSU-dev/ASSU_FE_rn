import { useMemo, useState } from "react";

export type SortOrder = "latest" | "oldest";

export function useSortedByDate<T extends { createdAt: Date }>(items: T[]) {
	const [sort, setSort] = useState<SortOrder>("latest");

	const sortedItems = useMemo(() => {
		return [...items].sort((a, b) =>
			sort === "latest"
				? b.createdAt.getTime() - a.createdAt.getTime()
				: a.createdAt.getTime() - b.createdAt.getTime(),
		);
	}, [items, sort]);

	return { sort, setSort, sortedItems };
}
