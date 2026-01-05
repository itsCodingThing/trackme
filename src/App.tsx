import TrackerMap from "@/components/tracker-map";
import { useGeoTracker } from "@/hooks/useGeoTracker";
import { useEffect } from "react";

export default function TrackerPage() {
	const { route, distance, isTracking, start, pause, stop, reset } =
		useGeoTracker();

	const distanceKm = (distance / 1000).toFixed(2);

	useEffect(() => {
		console.log(route);
	});

	return (
		<div className="h-screen flex flex-col">
			{/* Stats */}
			<div className="p-4 bg-white shadow flex justify-between">
				<div>
					<div className="text-xs text-gray-500">Distance</div>
					<div className="text-lg font-semibold">{distanceKm} km</div>
				</div>

				<div className="flex gap-2">
					{!isTracking && route.length === 0 && (
						<button
							type="button"
							onClick={start}
							className="px-4 py-2 bg-green-600 text-white rounded"
						>
							Start
						</button>
					)}

					{isTracking && (
						<button
							type="button"
							onClick={pause}
							className="px-4 py-2 bg-yellow-500 text-white rounded"
						>
							Pause
						</button>
					)}

					{!isTracking && route.length > 0 && (
						<>
							<button
								type="button"
								onClick={start}
								className="px-4 py-2 bg-green-600 text-white rounded"
							>
								Resume
							</button>
							<button
								type="button"
								onClick={stop}
								className="px-4 py-2 bg-red-600 text-white rounded"
							>
								Stop
							</button>
						</>
					)}

					{route.length > 0 && (
						<button
							type="button"
							onClick={reset}
							className="px-4 py-2 border rounded"
						>
							Reset
						</button>
					)}
				</div>
			</div>

			<div className="flex-1">
				<TrackerMap route={route} isTracking={isTracking} />
			</div>
		</div>
	);
}
