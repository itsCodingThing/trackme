import { useEffect } from "react";
import TrackerMap from "@/components/tracker-map";
import { Button } from "@/components/ui/button";
import useGeoTracker from "@/hooks/useGeoTracker";
import { Toaster } from "@/components/ui/sonner";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

function LoadingPoints() {
	return (
		<Item variant="muted">
			<ItemMedia>
				<Spinner />
			</ItemMedia>
			<ItemContent>
				<ItemTitle className="line-clamp-1">Processing ...</ItemTitle>
			</ItemContent>
		</Item>
	);
}

export default function TrackerPage() {
	const { route, distance, isTracking, start, pause, stop, reset } =
		useGeoTracker();

	const distanceKm = (distance / 1000).toFixed(2);

	useEffect(() => {
		console.log(route);
	});

	return (
		<>
			<div className="h-screen flex flex-col">
				<div className="p-4 bg-white shadow flex justify-between">
					<div>
						<div className="text-xs text-gray-500">Distance</div>
						<div className="text-lg font-semibold">{distanceKm} km</div>
					</div>

					<div className="flex gap-2">
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

				<div className="flex-1 p-2">
					{isTracking ? (
						route.length ? (
							<TrackerMap route={route} />
						) : (
							<div className="h-full flex justify-center items-center">
								<LoadingPoints />
							</div>
						)
					) : (
						<div className="h-full flex justify-center items-center">
							<Button type="button" onClick={start}>
								Start
							</Button>
						</div>
					)}
				</div>
			</div>
			<Toaster />
		</>
	);
}
