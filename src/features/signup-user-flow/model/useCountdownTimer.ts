import { useCallback, useEffect, useMemo, useState } from "react";

type CountdownTimerOptions = {
	initialSeconds: number;
};

export function useCountdownTimer({ initialSeconds }: CountdownTimerOptions) {
	const [secondsLeft, setSecondsLeft] = useState(0);

	useEffect(() => {
		if (secondsLeft <= 0) {
			return;
		}

		const timer = setInterval(() => {
			setSecondsLeft((prev) => Math.max(prev - 1, 0));
		}, 1000);

		return () => clearInterval(timer);
	}, [secondsLeft]);

	const start = useCallback(() => {
		setSecondsLeft(initialSeconds);
	}, [initialSeconds]);

	const reset = useCallback(() => {
		setSecondsLeft(0);
	}, []);

	const mmss = useMemo(() => {
		const minute = Math.floor(secondsLeft / 60)
			.toString()
			.padStart(2, "0");
		const second = (secondsLeft % 60).toString().padStart(2, "0");
		return `${minute}:${second}`;
	}, [secondsLeft]);

	return {
		secondsLeft,
		isRunning: secondsLeft > 0,
		mmss,
		start,
		reset,
	};
}
