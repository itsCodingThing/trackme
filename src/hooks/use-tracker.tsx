import * as turf from "@turf/turf";
import { useCallback, useRef, useState } from "react";

export interface Point {
	lat: number;
	lng: number;
	timestamp: number;
}

interface GeolocationOptions {
	enableHighAccuracy?: boolean;
	maximumAge?: number;
	timeout?: number;
}

const TrackingStatus = {
	IDLE: "idle",
	TRACKING: "tracking",
	PAUSED: "paused",
	STOPPED: "stopped",
} as const;

type TrackingState = (typeof TrackingStatus)[keyof typeof TrackingStatus];

export function distanceBetween(p1: Point, p2: Point) {
	return turf.distance(
		turf.point([p1.lng, p1.lat]),
		turf.point([p2.lng, p2.lat]),
		{ units: "meters" },
	);
}

export default function useGeoTracker(options: GeolocationOptions = {}) {
	const watchIdRef = useRef<number | null>(null);
	const lastPointRef = useRef<Point | null>(null);

	const [route, setRoute] = useState<Point[]>([]);
	const [distance, setDistance] = useState(0); // meters
	const [status, setStatus] = useState<TrackingState>("idle");

	const start = useCallback(async () => {
		if (!navigator.geolocation) {
			return;
		}

		if (watchIdRef.current !== null) return;

		let permission: PermissionStatus;
		try {
			permission = await navigator.permissions.query({ name: "geolocation" });
		} catch (error) {
			console.log(error);
			return;
		}

		if (permission.state === "prompt") {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position.coords);
				},
				(err) => {
					console.log(err);
				},
				options,
			);
		}

		if (permission.state === "denied") {
			console.log("need permissions for geolocation");
		}

		if (permission.state === "granted") {
			setStatus("tracking");

			watchIdRef.current = navigator.geolocation.watchPosition(
				(position) => {
					const { latitude, longitude, accuracy } = position.coords;

					// ignore noisy GPS points
					if (accuracy > 30) return;

					const point: Point = {
						lat: latitude,
						lng: longitude,
						timestamp: position.timestamp,
					};

					setRoute((prev) => [...prev, point]);

					if (lastPointRef.current) {
						const d = distanceBetween(lastPointRef.current, point);
						setDistance((prev) => prev + d);
					}

					lastPointRef.current = point;
				},
				(err) => {
					console.log(err);

					setStatus("stopped");
					setRoute([]);
					setDistance(0);

					if (watchIdRef.current !== null) {
						navigator.geolocation.clearWatch(watchIdRef.current);
						watchIdRef.current = null;
					}

					lastPointRef.current = null;
				},
				options,
			);
		}
	}, [options]);

	const requestPermission = useCallback(async () => {
		if (!navigator.geolocation) {
			return;
		}

		const permission = await navigator.permissions.query({
			name: "geolocation",
		});

		if (permission.state === "granted") {
			return;
		}

		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve(position);
				},
				(err) => {
					reject(err);
				},
				options,
			);
		});
	}, [options]);

	const pause = useCallback(() => {
		if (!watchIdRef.current) return;

		navigator.geolocation.clearWatch(watchIdRef.current);
		watchIdRef.current = null;

		setStatus("paused");
	}, []);

	const stop = useCallback(() => {
		if (!watchIdRef.current) return;

		navigator.geolocation.clearWatch(watchIdRef.current);
		watchIdRef.current = null;
		lastPointRef.current = null;

		setStatus("stopped");
	}, []);

	const reset = useCallback(() => {
		if (!watchIdRef.current) return;

		navigator.geolocation.clearWatch(watchIdRef.current);
		watchIdRef.current = null;
		lastPointRef.current = null;

		setRoute([]);
		setDistance(0);
		setStatus("idle");
	}, []);

	return {
		route,
		distance,
		status,
		start,
		pause,
		stop,
		reset,
		requestPermission,
	};
}
