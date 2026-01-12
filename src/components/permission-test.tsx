import { useState } from "react";
import { Card, Button, BlockTitle } from "konsta/react";
import {
	usePermissions,
	useGeolocationPermission,
	useMotionPermission,
	useFileSystemPermission,
} from "@/lib/permissions";

export function PermissionTestComponent() {
	const [testResults, setTestResults] = useState<string[]>([]);

	const addResult = (message: string) => {
		setTestResults((prev) => [
			...prev,
			`${new Date().toLocaleTimeString()}: ${message}`,
		]);
	};

	// Test the general usePermissions hook
	const {
		permissionStates,
		isLoading: permissionsLoading,
		checkPermissions,
		allGranted,
		anyDenied,
	} = usePermissions(["geolocation", "motion", "filesystem"]);

	// Test individual permission hooks
	const {
		checkPermission: checkGeo,
		requestPermission: requestGeo,
		getCurrentPosition,
	} = useGeolocationPermission();

	const {
		checkPermission: checkMotion,
		requestPermission: requestMotion,
		isSupported: motionSupported,
		watchMotion,
	} = useMotionPermission();

	const {
		checkPermission: checkFileSystem,
		isSupported: fsSupported,
		openFile,
		saveFile,
		readFile,
	} = useFileSystemPermission();

	const testGeneralPermissions = async () => {
		addResult("Testing general permission hook...");
		await checkPermissions();
		addResult(`All granted: ${allGranted()}`);
		addResult(`Any denied: ${anyDenied()}`);
		addResult("General permission test completed");
	};

	const testGeolocation = async () => {
		addResult("Testing geolocation permission...");
		const status = await checkGeo();
		addResult(`Geolocation status: ${status}`);

		if (status === "granted") {
			try {
				const position = await getCurrentPosition();
				addResult(
					`Position: ${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`,
				);
			} catch (error) {
				addResult(
					`Position error: ${error instanceof Error ? error.message : "Unknown error"}`,
				);
			}
		} else {
			addResult("Requesting geolocation permission...");
			await requestGeo();
		}
		addResult("Geolocation test completed");
	};

	const testMotion = async () => {
		addResult("Testing motion permission...");
		addResult(`Motion supported: ${motionSupported()}`);

		const status = await checkMotion();
		addResult(`Motion status: ${status}`);

		if (status !== "denied") {
			addResult("Setting up motion watcher...");
			const stopWatching = watchMotion((data) => {
				addResult(
					`Motion data: acceleration=${!!data.acceleration}, rotation=${!!data.rotationRate}`,
				);
			});

			// Stop watching after 3 seconds
			setTimeout(() => {
				stopWatching();
				addResult("Stopped motion watching");
			}, 3000);
		} else {
			addResult("Requesting motion permission...");
			await requestMotion();
		}
		addResult("Motion test completed");
	};

	const testFileSystem = async () => {
		addResult("Testing file system permission...");
		addResult(`File System supported: ${fsSupported()}`);

		const status = await checkFileSystem();
		addResult(`File System status: ${status}`);

		try {
			// Test opening a file picker
			const files = await openFile({
				accept: {
					"text/plain": [".txt"],
					"application/json": [".json"],
					"image/*": [".png", ".jpg", ".jpeg"],
				},
			});

			addResult(`Selected ${files.length} file(s):`);
			files.forEach((file) => {
				addResult(
					`- ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)}KB)`,
				);
			});

			// Test reading the first file if available
			if (files.length > 0) {
				const content = await readFile(files[0].handle);
				addResult(
					`File content preview: ${content.substring(0, 100)}${content.length > 100 ? "..." : ""}`,
				);

				// Test saving a file
				await saveFile(
					"test-output.txt",
					`File system test completed at ${new Date().toLocaleString()}`,
				);
				addResult("Successfully saved test file");
			}
		} catch (error) {
			if (error instanceof Error && error.message.includes("User cancelled")) {
				addResult("User cancelled file selection");
			} else {
				addResult(
					`File System error: ${error instanceof Error ? error.message : "Unknown error"}`,
				);
			}
		}

		addResult("File System test completed");
	};

	const clearResults = () => {
		setTestResults([]);
	};

	return (
		<div className="space-y-4">
			<BlockTitle>Permission System Tests</BlockTitle>

			<Card className="p-4">
				<h3 className="font-semibold mb-3">General Hook Tests</h3>
				<div className="grid grid-cols-2 gap-2">
					<Button
						onClick={testGeneralPermissions}
						disabled={permissionsLoading}
					>
						Test General
					</Button>
					<Button onClick={clearResults} className="k-color-secondary">
						Clear Results
					</Button>
				</div>
			</Card>

			<Card className="p-4">
				<h3 className="font-semibold mb-3">Individual Permission Tests</h3>
				<div className="space-y-2">
					<Button onClick={testGeolocation} className="w-full">
						Test Geolocation
					</Button>
					<Button onClick={testMotion} className="w-full">
						Test Motion Sensors
					</Button>
					<Button onClick={testFileSystem} className="w-full">
						Test File System (Read/Write Files)
					</Button>
				</div>
			</Card>

			<Card className="p-4">
				<h3 className="font-semibold mb-3">Permission States</h3>
				<div className="space-y-2 text-sm">
					{Object.entries(permissionStates).map(([permission, state]) => (
						<div key={permission} className="flex justify-between">
							<span className="capitalize">{permission}:</span>
							<span className={state.isLoading ? "text-muted-foreground" : ""}>
								{state.isLoading ? "Loading..." : state.status}
								{state.error && ` (${state.error})`}
							</span>
						</div>
					))}
				</div>
			</Card>

			<Card className="p-4 max-h-64 overflow-y-auto">
				<h3 className="font-semibold mb-3">Test Results</h3>
				<div className="space-y-1 text-xs font-mono">
					{testResults.length === 0 ? (
						<p className="text-muted-foreground">No tests run yet</p>
					) : (
						testResults.map((result, index) => (
							<div key={`result-${index}-${result.slice(0, 10)}`}>{result}</div>
						))
					)}
				</div>
			</Card>
		</div>
	);
}
