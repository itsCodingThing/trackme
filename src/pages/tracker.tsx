import TrackerMap from "@/components/tracker-map";
import useGeoTracker from "@/hooks/use-tracker";
import { Card, Chip, Page, Button } from "konsta/react";

const distanceKm = (m: number) => (m / 1000).toFixed(2);

export default function Tracker() {
	const tracker = useGeoTracker();

	return (
		<Page>
			<div className="h-full flex flex-col">
				<div className="h-72">
					{tracker.geo.coords.length ? (
						<TrackerMap coords={tracker.geo.coords} />
					) : null}
				</div>
				<div className="flex-1 p-1">
					<Chip className="m-0.5 animate-pulse">{tracker.geo.status}</Chip>
					<div className="grid grid-cols-2 grid-rows-2">
						<Card outline>
							<p>TIME</p>
							<p>00:00:00</p>
						</Card>
						<Card outline>
							<p>SPEED</p>
							<p>0 m/s</p>
						</Card>
						<Card outline>
							<p>DISTANCE</p>
							<p>{distanceKm(tracker.geo.distance)} km</p>
						</Card>
						<Card outline>
							<p>CALORIES</p>
							<p>00 kml</p>
						</Card>
					</div>
					<div className="flex px-1 gap-1">
						{tracker.geo.status === "tracking" && (
							<>
								<Button onClick={() => tracker.pause()}>Pause</Button>
								<Button onClick={() => tracker.reset()}>Stop</Button>
							</>
						)}
						{tracker.geo.status === "paused" && (
							<Button onClick={() => tracker.start()}>Resume</Button>
						)}
						{tracker.geo.status === "idle" && (
							<Button onClick={() => tracker.start()}>Start</Button>
						)}
					</div>
				</div>
			</div>
		</Page>
	);
}
