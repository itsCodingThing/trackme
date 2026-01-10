import TrackerMap from "@/components/tracker-map";
import useGeoTracker from "@/hooks/use-tracker";
import { Block, Button, Page, Preloader } from "konsta/react";
import { useEffect, useState } from "react";
import { motion, useTime, useTransform } from "motion/react";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";

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

export const trackerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/tracker",
	component: () => <Tracker />,
});

export default function Tracker() {
	const tracker = useGeoTracker();
	const [isExpanded, setIsExpanded] = useState(false); // percentage of screen height
	const time = useTime();
	const formattedTime = useTransform(time, (t) => {
		const totalSeconds = Math.floor(t / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	});

	useEffect(() => {
		tracker.start();
	}, [tracker]);

	const sheetParent = {
		expanded: {
			height: "70vh",
		},
		collapsed: {
			height: "auto",
		},
	};

	const sheetChild = {
		expanded: {
			opacity: 1,
			height: "auto",
		},
		collapsed: {
			opacity: 0,
			height: 0,
			display: "none",
		},
	};

	return (
		<Page className="overflow-hidden">
			{/* Map takes remaining height */}
			<motion.div
				className="absolute inset-x-0 top-0 z-0"
				animate={{
					height: isExpanded ? "30vh" : "100vh",
				}}
			>
				{tracker.geo.coords.length ? (
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
			</motion.div>

			{/* Bottom Sheet */}
			<motion.div
				className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl shadow-2xl z-10"
				variants={sheetParent}
				animate={isExpanded ? "expanded" : "collapsed"}
				drag="y"
				dragConstraints={{ top: 0, bottom: 0 }}
				dragElastic={0.2}
				onDragEnd={(_, info) => {
					const { offset, velocity } = info;

					if (Math.abs(velocity.y) > 500) {
						// Fast swipe
						if (velocity.y > 0) {
							setIsExpanded(false); // Swipe down - collapse
						} else {
							setIsExpanded(true); // Swipe up - expand
						}
					} else {
						// Based on drag distance
						if (offset.y > 50) {
							setIsExpanded(false); // Dragged down - collapse
						} else if (offset.y < -50) {
							setIsExpanded(true); // Dragged up - expand
						}
					}
				}}
			>
				{/* Drag Handle */}
				<div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
					<div className="h-1.5 w-12 rounded-full bg-muted" />
				</div>

				{/* Content */}
				<div className="p-4 space-y-4 overflow-y-auto">
					{/* Main Stats - Always Visible */}
					<div className="flex justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Distance</p>
							<p className="text-2xl font-bold">
								{distanceKm(tracker.geo.distance)} km
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Duration</p>
							<motion.p className="text-2xl font-bold">
								{formattedTime}
							</motion.p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Pace</p>
							<p className="text-2xl font-bold">7'35"</p>
						</div>
					</div>

					{/* Detailed Stats - Animated */}
					<motion.div
						variants={sheetChild}
						animate={isExpanded ? "expanded" : "collapsed"}
						className="space-y-4 pt-4 border-t border-muted overflow-hidden"
					>
						<div className="grid grid-cols-2 gap-4">
							<Stat label="Steps" value="4,120" />
							<Stat label="Calories" value="198 kcal" />
							<Stat label="Avg Speed" value="4.9 km/h" />
							<Stat label="Elevation Gain" value="22 m" />
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3 pt-4">
							<Button className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold">
								Stop
							</Button>
							<Button className="flex-1 bg-muted py-3 text-black rounded-xl font-semibold">
								Pause
							</Button>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</Page>
	);
}
