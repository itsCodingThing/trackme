import type { PermissionType, PermissionStatus } from "./types";

export class PermissionManager {
	private static instance: PermissionManager;

	private constructor() {}

	static getInstance(): PermissionManager {
		if (!PermissionManager.instance) {
			PermissionManager.instance = new PermissionManager();
		}
		return PermissionManager.instance;
	}

	async checkPermission(permission: PermissionType): Promise<PermissionStatus> {
		try {
			switch (permission) {
				case "geolocation":
					return await this.checkGeolocationPermission();
				case "motion":
					return await this.checkMotionPermission();
				case "filesystem":
					return await this.checkFileSystemPermission();
				case "notifications":
					return await this.checkNotificationPermission();
				case "camera":
					return await this.checkCameraPermission();
				case "microphone":
					return await this.checkMicrophonePermission();
				default:
					return "unknown";
			}
		} catch (error) {
			console.error(`Error checking ${permission} permission:`, error);
			return "unknown";
		}
	}

	async requestPermission(
		permission: PermissionType,
	): Promise<PermissionStatus> {
		try {
			switch (permission) {
				case "geolocation":
					return await this.requestGeolocationPermission();
				case "motion":
					return await this.requestMotionPermission();
				case "filesystem":
					return await this.requestFileSystemPermission();
				case "notifications":
					return await this.requestNotificationPermission();
				case "camera":
					return await this.requestCameraPermission();
				case "microphone":
					return await this.requestMicrophonePermission();
				default:
					return "unknown";
			}
		} catch (error) {
			console.error(`Error requesting ${permission} permission:`, error);
			return "denied";
		}
	}

	private async checkGeolocationPermission(): Promise<PermissionStatus> {
		if (!navigator.geolocation) {
			return "denied";
		}

		if ("permissions" in navigator) {
			try {
				const result = await navigator.permissions.query({
					name: "geolocation",
				});
				return result.state as PermissionStatus;
			} catch {
				// Fallback: try getCurrentPosition to check
				return new Promise((resolve) => {
					navigator.geolocation.getCurrentPosition(
						() => resolve("granted"),
						() => resolve("denied"),
						{ timeout: 100, maximumAge: 0 },
					);
				});
			}
		}

		// Fallback: assume prompt if we can't check
		return "prompt";
	}

	private async requestGeolocationPermission(): Promise<PermissionStatus> {
		if (!navigator.geolocation) {
			return "denied";
		}

		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(
				() => resolve("granted"),
				(error) => {
					if (error.code === error.PERMISSION_DENIED) {
						resolve("denied");
					} else {
						resolve("prompt");
					}
				},
				{ timeout: 5000 },
			);
		});
	}

	private async checkMotionPermission(): Promise<PermissionStatus> {
		// Check for DeviceMotionEvent
		if (!window.DeviceMotionEvent) {
			return "denied";
		}

		// Check if permission is required (iOS 13+)
		if (
			typeof (
				DeviceMotionEvent as unknown as {
					requestPermission?: () => Promise<string>;
				}
			).requestPermission === "function"
		) {
			if ("permissions" in navigator) {
				try {
					// Try to check motion permissions (not standardized, so this might fail)
					// For now, we'll assume prompt status
					return "prompt";
				} catch {
					return "prompt";
				}
			}
		}

		// Motion sensors might be available without explicit permission
		return "granted";
	}

	private async requestMotionPermission(): Promise<PermissionStatus> {
		if (!window.DeviceMotionEvent) {
			return "denied";
		}

		// iOS 13+ requires explicit permission for motion sensors
		if (
			typeof (
				DeviceMotionEvent as unknown as {
					requestPermission?: () => Promise<string>;
				}
			).requestPermission === "function"
		) {
			try {
				const motionEvent = DeviceMotionEvent as unknown as {
					requestPermission: () => Promise<string>;
				};
				const result = await motionEvent.requestPermission();
				return result as PermissionStatus;
			} catch (error) {
				console.error("Error requesting motion permission:", error);
				return "denied";
			}
		}

		// Motion sensors are available without permission on other platforms
		return "granted";
	}

	private async checkFileSystemPermission(): Promise<PermissionStatus> {
		// Check if File System Access API is supported
		const windowWithFS = window as unknown as {
			showOpenFilePicker?: (options: unknown) => Promise<unknown[]>;
			showSaveFilePicker?: (options: unknown) => Promise<unknown>;
		};

		if (!windowWithFS.showOpenFilePicker || !windowWithFS.showSaveFilePicker) {
			return "denied";
		}

		// File System Access API permissions are handled at the time of access
		// We can't check them beforehand, so we return 'prompt'
		return "prompt";
	}

	private async requestFileSystemPermission(): Promise<PermissionStatus> {
		// Check if File System Access API is supported
		const windowWithFS = window as unknown as {
			showOpenFilePicker?: (options: unknown) => Promise<unknown[]>;
			showSaveFilePicker?: (options: unknown) => Promise<unknown>;
		};

		if (!windowWithFS.showOpenFilePicker || !windowWithFS.showSaveFilePicker) {
			return "denied";
		}

		// File System Access API permissions are granted at the time of use
		// We'll trigger a dummy file picker to check if user grants permission
		try {
			// This will open a file picker and immediately close it
			// If user cancels, we'll get an error
			await windowWithFS.showOpenFilePicker!({
				multiple: false,
				types: [
					{
						description: "Test file",
						accept: { "text/plain": [".txt"] },
					},
				],
			}).catch(() => {
				// User cancelled, which means the API works but permission wasn't granted
				throw new Error("User cancelled");
			});

			return "granted";
		} catch {
			// If user cancelled or there was an error, return prompt
			// The actual permission will be requested when needed
			return "prompt";
		}
	}

	private async checkNotificationPermission(): Promise<PermissionStatus> {
		if (!("Notification" in window)) {
			return "denied";
		}

		return Notification.permission as PermissionStatus;
	}

	private async requestNotificationPermission(): Promise<PermissionStatus> {
		if (!("Notification" in window)) {
			return "denied";
		}

		const result = await Notification.requestPermission();
		return result as PermissionStatus;
	}

	private async checkCameraPermission(): Promise<PermissionStatus> {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			return "denied";
		}

		if ("permissions" in navigator) {
			try {
				const result = await navigator.permissions.query({
					name: "camera" as PermissionName,
				});
				return result.state as PermissionStatus;
			} catch {
				return "prompt";
			}
		}

		return "prompt";
	}

	private async requestCameraPermission(): Promise<PermissionStatus> {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			return "denied";
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			stream.getTracks().forEach((track) => {
				track.stop();
			});
			return "granted";
		} catch (error) {
			if (error instanceof Error && error.name === "NotAllowedError") {
				return "denied";
			}
			return "prompt";
		}
	}

	private async checkMicrophonePermission(): Promise<PermissionStatus> {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			return "denied";
		}

		if ("permissions" in navigator) {
			try {
				const result = await navigator.permissions.query({
					name: "microphone" as PermissionName,
				});
				return result.state as PermissionStatus;
			} catch {
				return "prompt";
			}
		}

		return "prompt";
	}

	private async requestMicrophonePermission(): Promise<PermissionStatus> {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			return "denied";
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			stream.getTracks().forEach((track) => {
				track.stop();
			});
			return "granted";
		} catch (error) {
			if (error instanceof Error && error.name === "NotAllowedError") {
				return "denied";
			}
			return "prompt";
		}
	}

	// Utility methods for common permission patterns
	async checkMultiplePermissions(
		permissions: PermissionType[],
	): Promise<Record<PermissionType, PermissionStatus>> {
		const results = {} as Record<PermissionType, PermissionStatus>;

		await Promise.all(
			permissions.map(async (permission) => {
				results[permission] = await this.checkPermission(permission);
			}),
		);

		return results;
	}

	async requestMultiplePermissions(
		permissions: PermissionType[],
	): Promise<Record<PermissionType, PermissionStatus>> {
		const results = {} as Record<PermissionType, PermissionStatus>;

		for (const permission of permissions) {
			results[permission] = await this.requestPermission(permission);
		}

		return results;
	}

	isPermissionGranted(status: PermissionStatus): boolean {
		return status === "granted";
	}

	isPermissionDenied(status: PermissionStatus): boolean {
		return status === "denied";
	}

	requiresPermissionPrompt(status: PermissionStatus): boolean {
		return status === "prompt";
	}
}

// Export singleton instance
export const permissionManager = PermissionManager.getInstance();
