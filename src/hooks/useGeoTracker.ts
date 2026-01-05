import * as turf from "@turf/turf";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

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

	const start = useCallback(() => {
		if (!navigator.geolocation) {
			alert("Geolocation not supported");
			return;
		}

		if (watchIdRef.current !== null) return;

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
				setStatus("stopped");
				setRoute([]);
				setDistance(0);

				if (watchIdRef.current !== null) {
					navigator.geolocation.clearWatch(watchIdRef.current);
					watchIdRef.current = null;
				}

				lastPointRef.current = null;
				toast.error(`unable use geoloaction: ${err.message}`);
			},
			options,
		);
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
	};
}
