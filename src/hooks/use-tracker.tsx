import { distanceBetween } from "@/lib/utils";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

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

const PermissionStatus = {
	GRANTED: "granted",
	DENIED: "denied",
	CHECKING: "checking",
} as const;

type TrackingState = (typeof TrackingStatus)[keyof typeof TrackingStatus];
type PersmissionState =
	(typeof PermissionStatus)[keyof typeof PermissionStatus];

interface GeoTrackerState {
	coords: Point[];
	distance: number;
	status: TrackingState;
	permission: PersmissionState;
	error: GeolocationPositionError | null;
}

const state = atom<GeoTrackerState>({
	coords: [],
	distance: 0,
	status: "idle",
	permission: "checking",
	error: null,
});

export default function useGeoTracker(options: GeolocationOptions = {}) {
	const [geo, setGeo] = useAtom(state);
	const watchIdRef = useRef<number | null>(null);
	const lastPointRef = useRef<Point | null>(null);

	useEffect(() => {
		checkPermission();
		async function checkPermission() {
			try {
				const permissions = await navigator.permissions.query({
					name: "geolocation",
				});

				if (permissions.state === "denied" || permissions.state === "granted") {
					const per = permissions.state;

					setGeo((prev) => {
						return {
							...prev,
							permission: per,
						};
					});

					return;
				}

				// prompt permission
				navigator.geolocation.getCurrentPosition(() => {
					setGeo((prev) => {
						return {
							...prev,
							permission: "granted",
						};
					});
				});
			} catch (error) {
				console.log(error);
			}
		}

		return () => {
			if (watchIdRef.current !== null) {
				navigator.geolocation.clearWatch(watchIdRef.current);
			}
		};
	}, [setGeo]);

	const start = async () => {
		if (watchIdRef.current !== null) return;

		if (geo.permission === "granted") {
			setGeo((prev) => ({ ...prev, status: "tracking" }));

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

					setGeo((prev) => ({ ...prev, coords: [...prev.coords, point] }));

					if (lastPointRef.current) {
						const d = distanceBetween(lastPointRef.current, point);
						setGeo((prev) => ({ ...prev, distance: prev.distance + d }));
					}

					lastPointRef.current = point;
				},
				(err) => {
					if (err.code === 1) {
						setGeo((prev) => {
							return {
								...prev,
								permission: "denied",
							};
						});
					}

					if (watchIdRef.current !== null) {
						navigator.geolocation.clearWatch(watchIdRef.current);
						watchIdRef.current = null;
					}

					lastPointRef.current = null;
				},
				options,
			);
		}
	};

	const pause = () => {
		if (!watchIdRef.current) return;

		navigator.geolocation.clearWatch(watchIdRef.current);
		watchIdRef.current = null;

		setGeo((prev) => ({ ...prev, status: "paused" }));
	};

	const stop = () => {
		if (!watchIdRef.current) return;

		navigator.geolocation.clearWatch(watchIdRef.current);
		watchIdRef.current = null;
		lastPointRef.current = null;

		setGeo((prev) => ({ ...prev, status: "stopped" }));
	};

	const reset = () => {
		if (!watchIdRef.current) return;

		navigator.geolocation.clearWatch(watchIdRef.current);
		watchIdRef.current = null;
		lastPointRef.current = null;

		setGeo((prev) => ({ ...prev, coords: [], distance: 0, status: "idle" }));
	};

	return {
		geo,
		start,
		pause,
		stop,
		reset,
	};
}
