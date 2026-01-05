import * as turf from "@turf/turf";
import { useCallback, useRef, useState } from "react";

type Point = {
	lat: number;
	lng: number;
	timestamp: number;
};

function distanceBetween(p1: Point, p2: Point) {
	return turf.distance(
		turf.point([p1.lng, p1.lat]),
		turf.point([p2.lng, p2.lat]),
		{ units: "meters" },
	);
}

export function useGeoTracker() {
	const watchIdRef = useRef<number | null>(null);
	const lastPointRef = useRef<Point | null>(null);

	const [route, setRoute] = useState<Point[]>([]);
	const [distance, setDistance] = useState(0); // meters
	const [isTracking, setIsTracking] = useState(false);

	const start = useCallback(() => {
		if (!navigator.geolocation) {
			alert("Geolocation not supported");
			return;
		}

		if (watchIdRef.current !== null) return;

		setIsTracking(true);

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
				console.error(err);
			},
			{
				enableHighAccuracy: true,
				maximumAge: 1000,
				timeout: 10000,
			},
		);
	}, []);

	const pause = useCallback(() => {
		if (watchIdRef.current !== null) {
			navigator.geolocation.clearWatch(watchIdRef.current);
			watchIdRef.current = null;
			setIsTracking(false);
		}
	}, []);

	const stop = useCallback(() => {
		pause();
		lastPointRef.current = null;
	}, [pause]);

	const reset = useCallback(() => {
		stop();
		setRoute([]);
		setDistance(0);
	}, [stop]);

	return {
		route,
		distance,
		isTracking,
		start,
		pause,
		stop,
		reset,
	};
}
