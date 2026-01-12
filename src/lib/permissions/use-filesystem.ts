import { useCallback } from "react";
import { permissionManager } from "./manager";
import type {
	PermissionStatus,
	FileSystemPermissionOptions,
	FileSystemFileInfo,
	FileSystemDirectoryInfo,
} from "./types";

export function useFileSystemPermission(
	_options?: FileSystemPermissionOptions,
) {
	const checkPermission = useCallback(async (): Promise<PermissionStatus> => {
		return await permissionManager.checkPermission("filesystem");
	}, []);

	const requestPermission = useCallback(async (): Promise<PermissionStatus> => {
		return await permissionManager.requestPermission("filesystem");
	}, []);

	const isSupported = useCallback((): boolean => {
		const windowWithFS = window as unknown as {
			showOpenFilePicker?: (options: unknown) => Promise<unknown[]>;
			showSaveFilePicker?: (options: unknown) => Promise<unknown>;
			showDirectoryPicker?: () => Promise<unknown>;
			getOriginPrivateFileSystem?: () => Promise<unknown>;
		};

		return !!(
			windowWithFS.showOpenFilePicker ||
			windowWithFS.showSaveFilePicker ||
			windowWithFS.showDirectoryPicker ||
			windowWithFS.getOriginPrivateFileSystem
		);
	}, []);

	const openFile = useCallback(
		async (pickerOptions?: {
			multiple?: boolean;
			accept?: Record<string, string[]>;
		}): Promise<FileSystemFileInfo[]> => {
			const windowWithFS = window as unknown as {
				showOpenFilePicker: (options: {
					multiple?: boolean;
					types?: Array<{
						description?: string;
						accept: Record<string, string[]>;
					}>;
				}) => Promise<FileSystemFileHandle[]>;
			};

			if (!windowWithFS.showOpenFilePicker) {
				throw new Error("File System Access API is not supported");
			}

			try {
				const handles = await windowWithFS.showOpenFilePicker({
					multiple: pickerOptions?.multiple ?? false,
					types: pickerOptions?.accept
						? [
								{
									description: "Files",
									accept: pickerOptions.accept,
								},
							]
						: undefined,
				});

				const files: FileSystemFileInfo[] = [];
				for (const handle of handles) {
					const file = await handle.getFile();
					files.push({
						name: file.name,
						type: file.type,
						size: file.size,
						lastModified: file.lastModified,
						handle,
					});
				}

				return files;
			} catch (error) {
				if (error instanceof Error && error.name === "AbortError") {
					throw new Error("User cancelled file selection");
				}
				throw error;
			}
		},
		[],
	);

	const saveFile = useCallback(
		async (
			fileName: string,
			content: string | ArrayBuffer | Blob,
			options?: {
				types?: Array<{
					description?: string;
					accept: Record<string, string[]>;
				}>;
			},
		): Promise<void> => {
			const windowWithFS = window as unknown as {
				showSaveFilePicker: (options: {
					suggestedName?: string;
					types?: Array<{
						description?: string;
						accept: Record<string, string[]>;
					}>;
				}) => Promise<FileSystemFileHandle>;
			};

			if (!windowWithFS.showSaveFilePicker) {
				throw new Error("File System Access API is not supported");
			}

			try {
				const handle = await windowWithFS.showSaveFilePicker({
					suggestedName: fileName,
					types: options?.types,
				});

				const writable = await handle.createWritable();
				await writable.write(content);
				await writable.close();
			} catch (error) {
				if (error instanceof Error && error.name === "AbortError") {
					throw new Error("User cancelled file save");
				}
				throw error;
			}
		},
		[],
	);

	const openDirectory =
		useCallback(async (): Promise<FileSystemDirectoryInfo> => {
			const windowWithFS = window as unknown as {
				showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
			};

			if (!windowWithFS.showDirectoryPicker) {
				throw new Error("Directory picker is not supported");
			}

			try {
				const handle = await windowWithFS.showDirectoryPicker();
				const entries: FileSystemHandle[] = [];

				// Try different iteration methods based on browser support
				try {
					const handleAny = handle as unknown as {
						entries?: () => AsyncIterableIterator<[string, FileSystemHandle]>;
						values?: () => AsyncIterableIterator<FileSystemHandle>;
					};
					if (
						"entries" in handleAny &&
						typeof handleAny.entries === "function"
					) {
						for await (const [_, entry] of handleAny.entries()) {
							entries.push(entry);
						}
					} else if (
						"values" in handleAny &&
						typeof handleAny.values === "function"
					) {
						for await (const entry of handleAny.values()) {
							entries.push(entry);
						}
					}
				} catch {
					// If iteration fails, return empty array
				}

				return {
					name: handle.name,
					entries,
					handle,
				};
			} catch (error) {
				if (error instanceof Error && error.name === "AbortError") {
					throw new Error("User cancelled directory selection");
				}
				throw error;
			}
		}, []);

	const readFile = useCallback(
		async (handle: FileSystemFileHandle): Promise<string> => {
			const file = await handle.getFile();
			return await file.text();
		},
		[],
	);

	const readFileAsArrayBuffer = useCallback(
		async (handle: FileSystemFileHandle): Promise<ArrayBuffer> => {
			const file = await handle.getFile();
			return await file.arrayBuffer();
		},
		[],
	);

	const readFileAsBlob = useCallback(
		async (handle: FileSystemFileHandle): Promise<Blob> => {
			const file = await handle.getFile();
			return file;
		},
		[],
	);

	const writeFile = useCallback(
		async (
			handle: FileSystemFileHandle,
			content: string | ArrayBuffer | Blob,
		): Promise<void> => {
			const writable = await handle.createWritable();
			await writable.write(content);
			await writable.close();
		},
		[],
	);

	const getFileStats = useCallback(
		async (handle: FileSystemFileHandle): Promise<FileSystemFileInfo> => {
			const file = await handle.getFile();
			return {
				name: file.name,
				type: file.type,
				size: file.size,
				lastModified: file.lastModified,
				handle,
			};
		},
		[],
	);

	const getDirectoryContents = useCallback(
		async (handle: FileSystemDirectoryHandle): Promise<FileSystemHandle[]> => {
			const entries: FileSystemHandle[] = [];

			try {
				const handleAny = handle as unknown as {
					entries?: () => AsyncIterableIterator<[string, FileSystemHandle]>;
					values?: () => AsyncIterableIterator<FileSystemHandle>;
				};
				if ("entries" in handleAny && typeof handleAny.entries === "function") {
					for await (const [_, entry] of handleAny.entries()) {
						entries.push(entry);
					}
				} else if (
					"values" in handleAny &&
					typeof handleAny.values === "function"
				) {
					for await (const entry of handleAny.values()) {
						entries.push(entry);
					}
				}
			} catch {
				// If iteration fails, return empty array
			}

			return entries;
		},
		[],
	);

	return {
		checkPermission,
		requestPermission,
		isSupported,
		openFile,
		saveFile,
		openDirectory,
		readFile,
		readFileAsArrayBuffer,
		readFileAsBlob,
		writeFile,
		getFileStats,
		getDirectoryContents,
	};
}
