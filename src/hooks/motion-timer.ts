import { useState } from "react";
import { useTime, useTransform } from "motion/react";

export default function useMotionTimer() {
	const time = useTime();
	const [startTime, setStartTime] = useState<number | null>(null);
	const [pausedAt, setPausedAt] = useState(0);

	const elapsed = useTransform(time, (t) => {
		if (startTime === null) return pausedAt;
		return pausedAt + (t - startTime);
	});

	const timer = useTransform(elapsed, (t) => {
		const s = Math.floor(t / 1000);
		return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
	});

	const start = () => {
		setStartTime(Date.now());
	};

	const pause = () => {
		setPausedAt(elapsed.get());
		setStartTime(null);
	};

	return {
		time: timer,
		start,
		pause,
	};
}
