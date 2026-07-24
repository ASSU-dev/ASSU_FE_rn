import { useState } from "react";

interface MonthNavigatorState {
	year: number;
	month: number;
}

export function useMonthNavigator(initialYear: number, initialMonth: number) {
	const [state, setState] = useState<MonthNavigatorState>({
		year: initialYear,
		month: initialMonth,
	});

	const handlePrev = () =>
		setState(({ year, month }) =>
			month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 },
		);

	const handleNext = () =>
		setState(({ year, month }) =>
			month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 },
		);

	return { year: state.year, month: state.month, handlePrev, handleNext };
}
