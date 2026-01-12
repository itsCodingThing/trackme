import { useCallback } from "react";
import { permissionManager } from "./manager";
import type { PermissionStatus, GeolocationOptions } from "./types";

export function useGeolocationPermission(options?: GeolocationOptions) {
	const checkPermission = useCallback(async (): Promise<PermissionStatus> => {
		return await permissionManager.checkPermission("geolocation");
	}, []);

	const requestPermission = useCallback(async (): Promise<PermissionStatus> => {
		return await permissionManager.requestPermission("geolocation");
	}, []);

	const getCurrentPosition = useCallback(
		async (posOptions?: GeolocationOptions): Promise<GeolocationPosition> => {
			return new Promise((resolve, reject) => {
				if (!navigator.geolocation) {
					reject(new Error("Geolocation is not supported by this browser"));
					return;
				}

				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: options?.enableHighAccuracy ?? true,
					timeout: options?.timeout ?? 10000,
					maximumAge: options?.maximumAge ?? 60000,
					...posOptions,
				});
			});
		},
		[options],
	);

	const watchPosition = useCallback(
		(
			callback: (position: GeolocationPosition) => void,
			posOptions?: GeolocationOptions,
		): number => {
			if (!navigator.geolocation) {
				throw new Error("Geolocation is not supported by this browser");
			}

			return navigator.geolocation.watchPosition(
				callback,
				(error) => {
					console.error("Geolocation watch error:", error);
				},
				{
					enableHighAccuracy: options?.enableHighAccuracy ?? true,
					timeout: options?.timeout ?? 10000,
					maximumAge: options?.maximumAge ?? 60000,
					...posOptions,
				},
			);
		},
		[options],
	);

	const clearWatch = useCallback((watchId: number): void => {
		if (navigator.geolocation) {
			navigator.geolocation.clearWatch(watchId);
		}
	}, []);

	return {
		checkPermission,
		requestPermission,
		getCurrentPosition,
		watchPosition,
		clearWatch,
	};
}
