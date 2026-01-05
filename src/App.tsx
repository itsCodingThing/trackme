import { useEffect } from "react";
import TrackerMap from "@/components/tracker-map";
import { Button } from "@/components/ui/button";
import useGeoTracker from "@/hooks/useGeoTracker";
import { Toaster } from "@/components/ui/sonner";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import TrackingTable from "./components/tracking-table";

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

export default function App() {
	const { route, distance, status, start, pause, stop, reset } =
		useGeoTracker();

	const distanceKm = (distance / 1000).toFixed(2);

	useEffect(() => {
		console.log(route);
	});

	return (
		<div className="h-svh container mx-auto p-2">
			<Card className="h-96 rounded-b-none pb-0">
				<CardHeader>
					<CardDescription>Distance</CardDescription>
					<CardTitle>{distanceKm} km</CardTitle>
					<CardAction className="gap-1">
						<div className="flex gap-1">
							{status === "tracking" && (
								<>
									<Button type="button" onClick={pause}>
										Pause
									</Button>
									<Button type="button" onClick={reset}>
										Reset
									</Button>
								</>
							)}

							{status === "paused" && (
								<>
									<Button type="button" onClick={start}>
										Resume
									</Button>
									<Button type="button" onClick={stop}>
										Stop
									</Button>
								</>
							)}
						</div>
					</CardAction>
				</CardHeader>
				<CardContent className="h-full p-1 bg-black">
					{status === "idle" ? (
						<div className="h-full flex justify-center items-center">
							<Button type="button" onClick={start}>
								Start
							</Button>
						</div>
					) : route.length ? (
						<TrackerMap route={route} />
					) : (
						<div className="h-full flex justify-center items-center">
							<LoadingPoints />
						</div>
					)}
				</CardContent>
			</Card>
			<TrackingTable route={route} />
			<Toaster />
		</div>
	);
}
