import TrackerMap from "@/components/tracker-map";
import useGeoTracker from "@/hooks/use-tracker";
import { Page } from "konsta/react";
import { useEffect } from "react";

const distanceKm = (m: number) => (m / 1000).toFixed(2);
const demo = [
	{
		lat: 26.9136,
		lng: 75.7858,
		timestamp: 1767908293687,
	},
];

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium">{value}</span>
		</div>
	);
}

export default function Tracker() {
	const tracker = useGeoTracker();

	useEffect(() => {
		tracker.start();
	}, [tracker]);

	return (
		<Page className="flex flex-col">
			<div className="flex-1">
				<TrackerMap
					coords={tracker.geo.coords.length ? tracker.geo.coords : demo}
				/>
			</div>

			<div className="bg-background shadow-xl">
				<div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" />
				<div className="p-4 space-y-4">
					<div className="flex justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Distance</p>
							<p className="text-xl font-bold">
								{distanceKm(tracker.geo.distance)} km
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Duration</p>
							<p className="text-xl font-bold">24:18</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Pace</p>
							<p className="text-xl font-bold">7'35"</p>
						</div>
					</div>

					<div className="space-y-3 pt-2">
						<Stat label="Steps" value="4,120" />
						<Stat label="Calories" value="198 kcal" />
						<Stat label="Avg Speed" value="4.9 km/h" />
						<Stat label="Elevation Gain" value="22 m" />
					</div>
				</div>
			</div>
		</Page>
	);
}
