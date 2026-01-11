import TrackerMap from "@/components/tracker-map";
import useGeoTracker from "@/hooks/use-tracker";
import { Block, Button, Chip, Page, Preloader } from "konsta/react";
import { useEffect, useState } from "react";
import { motion, useTime, useTransform } from "motion/react";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";

const distanceKm = (m: number) => (m / 1000).toFixed(2);

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium">{value}</span>
		</div>
	);
}

function useMotionTimer() {
	const time = useTime();
	const [startTime, setStartTime] = useState<number | null>(null);
	const [pausedAt, setPausedAt] = useState(0);

	const elapsed = useTransform(time, (t) => {
		if (startTime === null) return pausedAt;
		return pausedAt + (t - startTime);
	});

	const timer = useTransform(elapsed, (t) => {
		const s = Math.floor(t / 1000);
		return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
	});

	const start = () => {
		setStartTime(Date.now());
	};

	const pause = () => {
		setPausedAt(elapsed.get());
		setStartTime(null);
	};

	return {
		time: timer,
		start,
		pause,
	};
}

export const TrackerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/tracker",
	component: () => <Tracker />,
});

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

export default function Tracker() {
	const tracker = useGeoTracker();
	const [isExpanded, setIsExpanded] = useState(true);
	const timer = useMotionTimer();

	useEffect(() => {
		tracker.start();
		timer.start();
	}, []);

	return (
		<Page className="overflow-hidden pb-20">
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

			<Chip className="m-1 absolute top-0 left-0 animate-pulse">
				{tracker.geo.status}
			</Chip>

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
							<motion.p className="text-2xl font-bold">{timer.time}</motion.p>
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
							<Button
								className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold"
								onClick={() => {
									tracker.start();
									timer.start();
								}}
							>
								Stop
							</Button>
							<Button
								className="flex-1 bg-muted py-3 text-black rounded-xl font-semibold"
								onClick={() => {
									tracker.pause();
								}}
							>
								Pause
							</Button>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</Page>
	);
}
