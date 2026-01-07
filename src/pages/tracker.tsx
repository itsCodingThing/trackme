import TrackerMap from "@/components/tracker-map";
import useGeoTracker from "@/hooks/use-tracker";
import { Card, Chip, Page, Button } from "konsta/react";

const demo = [{ lat: 26.9136, lng: 75.7858, timestamp: 1767800265293 }];
const distanceKm = (m: number) => (m / 1000).toFixed(2);

export default function Tracker() {
	const tracker = useGeoTracker();

	return (
		<Page className="bg-black">
			<div className="h-full flex flex-col">
				<div className="flex-1">
					<TrackerMap route={demo} />
				</div>
				<div className="p-1 bg-pink-300">
					<Chip className="m-0.5 animate-pulse absolute top-0 left-0 z-[1000]">
						{tracker.status}
					</Chip>
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
							<p>{distanceKm(tracker.distance)} km</p>
						</Card>
						<Card outline>
							<p>CALORIES</p>
							<p>00 kml</p>
						</Card>
					</div>
					<div className="flex px-1 gap-1">
						<Button>Start</Button>
						<Button>Stop</Button>
					</div>
				</div>
			</div>
		</Page>
	);
}
