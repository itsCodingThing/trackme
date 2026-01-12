import { useState, useEffect, useCallback } from "react";
import { permissionManager } from "./manager";
import type {
	PermissionType,
	PermissionStatus,
	PermissionState,
} from "./types";

export function usePermissions(permissions: PermissionType[]) {
	const [permissionStates, setPermissionStates] = useState<
		Record<PermissionType, PermissionState>
	>(() => {
		const initial: Record<PermissionType, PermissionState> = {} as Record<
			PermissionType,
			PermissionState
		>;
		permissions.forEach((permission) => {
			initial[permission] = {
				status: "unknown",
				isLoading: true,
				error: null,
			};
		});
		return initial;
	});

	const [isLoading, setIsLoading] = useState(true);

	const checkPermissions = useCallback(async () => {
		setIsLoading(true);
		const newStates: Record<PermissionType, PermissionState> = {} as Record<
			PermissionType,
			PermissionState
		>;

		await Promise.all(
			permissions.map(async (permission) => {
				try {
					const status = await permissionManager.checkPermission(permission);
					newStates[permission] = {
						status,
						isLoading: false,
						error: null,
					};
				} catch (error) {
					newStates[permission] = {
						status: "unknown",
						isLoading: false,
						error: error instanceof Error ? error.message : "Unknown error",
					};
				}
			}),
		);

		setPermissionStates(newStates);
		setIsLoading(false);
	}, [permissions]);

	const requestPermission = useCallback(
		async (permission: PermissionType): Promise<PermissionStatus> => {
			setPermissionStates((prev) => ({
				...prev,
				[permission]: { ...prev[permission], isLoading: true, error: null },
			}));

			try {
				const status = await permissionManager.requestPermission(permission);
				setPermissionStates((prev) => ({
					...prev,
					[permission]: { status, isLoading: false, error: null },
				}));
				return status;
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : "Unknown error";
				setPermissionStates((prev) => ({
					...prev,
					[permission]: {
						status: "denied",
						isLoading: false,
						error: errorMessage,
					},
				}));
				return "denied";
			}
		},
		[],
	);

	const requestAllPermissions = useCallback(async (): Promise<
		Record<PermissionType, PermissionStatus>
	> => {
		const results: Record<PermissionType, PermissionStatus> = {} as Record<
			PermissionType,
			PermissionStatus
		>;

		for (const permission of permissions) {
			results[permission] = await requestPermission(permission);
		}

		return results;
	}, [permissions, requestPermission]);

	const isGranted = useCallback(
		(permission: PermissionType): boolean => {
			return permissionManager.isPermissionGranted(
				permissionStates[permission]?.status,
			);
		},
		[permissionStates],
	);

	const isDenied = useCallback(
		(permission: PermissionType): boolean => {
			return permissionManager.isPermissionDenied(
				permissionStates[permission]?.status,
			);
		},
		[permissionStates],
	);

	const requiresPrompt = useCallback(
		(permission: PermissionType): boolean => {
			return permissionManager.requiresPermissionPrompt(
				permissionStates[permission]?.status,
			);
		},
		[permissionStates],
	);

	const allGranted = useCallback((): boolean => {
		return permissions.every((permission) => isGranted(permission));
	}, [permissions, isGranted]);

	const anyDenied = useCallback((): boolean => {
		return permissions.some((permission) => isDenied(permission));
	}, [permissions, isDenied]);

	const anyRequirePrompt = useCallback((): boolean => {
		return permissions.some((permission) => requiresPrompt(permission));
	}, [permissions, requiresPrompt]);

	useEffect(() => {
		checkPermissions();
	}, [checkPermissions]);

	return {
		permissionStates,
		isLoading,
		checkPermissions,
		requestPermission,
		requestAllPermissions,
		isGranted,
		isDenied,
		requiresPrompt,
		allGranted,
		anyDenied,
		anyRequirePrompt,
	};
}
