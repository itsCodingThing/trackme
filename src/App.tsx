import TrackerMap from "@/components/tracker-map";
import { useGeoTracker } from "@/hooks/useGeoTracker";
import { useEffect } from "react";
import { Button } from "./components/ui/button";

export default function TrackerPage() {
	const { route, distance, isTracking, start, pause, stop, reset } =
		useGeoTracker();

	const distanceKm = (distance / 1000).toFixed(2);

	useEffect(() => {
		console.log(route);
	});

	return (
		<div className="h-screen flex flex-col">
			<div className="p-4 bg-white shadow flex justify-between">
				<div>
					<div className="text-xs text-gray-500">Distance</div>
					<div className="text-lg font-semibold">{distanceKm} km</div>
				</div>

				<div className="flex gap-2">
					{!isTracking && route.length === 0 && (
						<Button type="button" onClick={start}>
							Start
						</Button>
					)}

					{isTracking && (
						<Button type="button" onClick={pause}>
							Pause
						</Button>
					)}

					{!isTracking && route.length > 0 && (
						<>
							<Button type="button" onClick={start}>
								Resume
							</Button>
							<Button type="button" onClick={stop}>
								Stop
							</Button>
						</>
					)}

					{route.length > 0 && (
						<Button type="button" onClick={reset}>
							Reset
						</Button>
					)}
				</div>
			</div>

			<div className="flex-1">
				<TrackerMap route={route} />
			</div>
		</div>
	);
}
