import { useCallback, useRef } from "react";
import { permissionManager } from "./manager";
import type { PermissionStatus } from "./types";

export interface MotionData {
	acceleration: DeviceMotionEventAcceleration | null;
	accelerationIncludingGravity: DeviceMotionEventAcceleration | null;
	rotationRate: DeviceMotionEventRotationRate | null;
	interval: number | null;
}

export interface OrientationData {
	absolute: boolean;
	alpha: number | null;
	beta: number | null;
	gamma: number | null;
}

export function useMotionPermission() {
	const motionListenerRef = useRef<((event: DeviceMotionEvent) => void) | null>(
		null,
	);
	const orientationListenerRef = useRef<
		((event: DeviceOrientationEvent) => void) | null
	>(null);

	const checkPermission = useCallback(async (): Promise<PermissionStatus> => {
		return await permissionManager.checkPermission("motion");
	}, []);

	const requestPermission = useCallback(async (): Promise<PermissionStatus> => {
		return await permissionManager.requestPermission("motion");
	}, []);

	const isSupported = useCallback((): boolean => {
		return !!(window.DeviceMotionEvent && window.DeviceOrientationEvent);
	}, []);

	const requestMotionPermissionIfNeeded =
		useCallback(async (): Promise<PermissionStatus> => {
			if (!isSupported()) {
				return "denied";
			}

			// Check if we need to request permission (iOS 13+)
			if (
				typeof (
					DeviceMotionEvent as unknown as {
						requestPermission?: () => Promise<string>;
					}
				).requestPermission === "function"
			) {
				return await requestPermission();
			}

			// Motion is available without permission on other platforms
			return "granted";
		}, [isSupported, requestPermission]);

	const watchMotion = useCallback(
		(callback: (data: MotionData) => void): (() => void) => {
			const handleMotion = (event: DeviceMotionEvent) => {
				callback({
					acceleration: event.acceleration,
					accelerationIncludingGravity: event.accelerationIncludingGravity,
					rotationRate: event.rotationRate,
					interval: event.interval,
				});
			};

			motionListenerRef.current = handleMotion;
			window.addEventListener("devicemotion", handleMotion);

			return () => {
				window.removeEventListener("devicemotion", handleMotion);
				motionListenerRef.current = null;
			};
		},
		[],
	);

	const watchOrientation = useCallback(
		(callback: (data: OrientationData) => void): (() => void) => {
			const handleOrientation = (event: DeviceOrientationEvent) => {
				callback({
					absolute: event.absolute,
					alpha: event.alpha,
					beta: event.beta,
					gamma: event.gamma,
				});
			};

			orientationListenerRef.current = handleOrientation;
			window.addEventListener("deviceorientation", handleOrientation);

			return () => {
				window.removeEventListener("deviceorientation", handleOrientation);
				orientationListenerRef.current = null;
			};
		},
		[],
	);

	const stopWatching = useCallback((): void => {
		if (motionListenerRef.current) {
			window.removeEventListener("devicemotion", motionListenerRef.current);
			motionListenerRef.current = null;
		}
		if (orientationListenerRef.current) {
			window.removeEventListener(
				"deviceorientation",
				orientationListenerRef.current,
			);
			orientationListenerRef.current = null;
		}
	}, []);

	const getCurrentMotionData = useCallback((): Promise<MotionData> => {
		return new Promise((resolve) => {
			const timeoutId = setTimeout(() => {
				resolve({
					acceleration: null,
					accelerationIncludingGravity: null,
					rotationRate: null,
					interval: null,
				});
			}, 1000);

			const handleMotion = (event: DeviceMotionEvent) => {
				clearTimeout(timeoutId);
				window.removeEventListener("devicemotion", handleMotion);
				resolve({
					acceleration: event.acceleration,
					accelerationIncludingGravity: event.accelerationIncludingGravity,
					rotationRate: event.rotationRate,
					interval: event.interval,
				});
			};

			window.addEventListener("devicemotion", handleMotion);
		});
	}, []);

	const getCurrentOrientationData =
		useCallback((): Promise<OrientationData> => {
			return new Promise((resolve) => {
				const timeoutId = setTimeout(() => {
					resolve({
						absolute: false,
						alpha: null,
						beta: null,
						gamma: null,
					});
				}, 1000);

				const handleOrientation = (event: DeviceOrientationEvent) => {
					clearTimeout(timeoutId);
					window.removeEventListener("deviceorientation", handleOrientation);
					resolve({
						absolute: event.absolute,
						alpha: event.alpha,
						beta: event.beta,
						gamma: event.gamma,
					});
				};

				window.addEventListener("deviceorientation", handleOrientation);
			});
		}, []);

	return {
		checkPermission,
		requestPermission,
		requestMotionPermissionIfNeeded,
		isSupported,
		watchMotion,
		watchOrientation,
		stopWatching,
		getCurrentMotionData,
		getCurrentOrientationData,
	};
}
