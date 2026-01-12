export type PermissionStatus = "granted" | "denied" | "prompt" | "unknown";

export type PermissionType =
	| "geolocation"
	| "motion"
	| "filesystem"
	| "notifications"
	| "camera"
	| "microphone";

export interface PermissionState {
	status: PermissionStatus;
	isLoading: boolean;
	error: string | null;
}

export interface PermissionResult {
	state: PermissionState;
	request: () => Promise<PermissionStatus>;
	check: () => Promise<PermissionStatus>;
}

export type PermissionsConfig = {
	[K in PermissionType]: {
		name: string;
		description: string;
		required: boolean;
		api?: string;
	};
};

export interface GeolocationOptions {
	enableHighAccuracy?: boolean;
	timeout?: number;
	maximumAge?: number;
}

export type MotionPermissionOptions = Record<string, never>;

export interface FileSystemPermissionOptions {
	allowWrite?: boolean;
	allowRead?: boolean;
	directory?: boolean;
	multiple?: boolean;
	accept?: string[]; // MIME types
}

export interface FileSystemHandle {
	name: string;
	kind: "file" | "directory";
}

export interface FileSystemFileInfo {
	name: string;
	type: string;
	size: number;
	lastModified: number;
	handle: FileSystemFileHandle;
}

export interface FileSystemDirectoryInfo {
	name: string;
	entries: FileSystemHandle[];
	handle: FileSystemDirectoryHandle;
}
