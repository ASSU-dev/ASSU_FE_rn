import { useState } from "react";

export function useMonthNavigator(initialMonth: number) {
	const [month, setMonth] = useState(initialMonth);
	const handlePrev = () => setMonth((m) => (m === 1 ? 12 : m - 1));
	const handleNext = () => setMonth((m) => (m === 12 ? 1 : m + 1));
	return { month, setMonth, handlePrev, handleNext };
}
