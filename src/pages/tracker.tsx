import TrackerMap from "@/components/tracker-map";
import useGeoTracker from "@/hooks/use-tracker";
import { Block, Chip, Fab, Page, Preloader } from "konsta/react";
import { useEffect } from "react";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { rootRoute } from "@/app";
import { HideBottomNav } from "@/components/bottom-nav";

export const TrackerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/tracker",
	component: () => <Tracker />,
});

export default function Tracker() {
	const tracker = useGeoTracker();
	const navigate = useNavigate();

	useEffect(() => {
		tracker.start();
	}, [tracker]);

	return (
		<Page className="pb-20">
			<HideBottomNav />
			<div className="h-full absolute inset-x-0 top-0 z-0">
				{tracker.geo.status === "tracking" && tracker.geo.coords.length ? (
					<TrackerMap coords={tracker.geo.coords} />
				) : (
					<Block
						strong
						inset
						className="flex justify-center items-center gap-2"
					>
						<Preloader /> Loading Coordinates...
					</Block>
				)}
			</div>

			<Chip className="m-1 absolute top-0 right-0 animate-pulse">
				{tracker.geo.status}
			</Chip>

			<Chip
				className="m-1 absolute top-0 left-0"
				onClick={() => {
					navigate({ to: "/" });
				}}
			>
				Back
			</Chip>

			<Fab
				className="m-1 absolute bottom-0 right-0"
				onClick={() => {
					console.log("start");
				}}
			>
				start
			</Fab>
		</Page>
	);
}
