import { useState, useEffect } from "react";
import { Card } from "konsta/react";
import { motion } from "motion/react";
import {
	ActivityIcon,
	TimerIcon,
	MapPinIcon,
	PauseIcon,
	PlayIcon,
	TrendingUpIcon,
} from "@/components/icons";

interface TrackingStats {
	distance: number;
	duration: number;
	pace: string;
	calories: number;
	speed: number;
	heartRate: number;
}

interface FloatingTrackingUIProps {
	isTracking?: boolean;
	isPaused?: boolean;
	stats?: TrackingStats;
	onToggle?: () => void;
	onPause?: () => void;
	className?: string;
}

export function FloatingTrackingUI({
	isTracking = false,
	isPaused = false,
	stats = {
		distance: 0,
		duration: 0,
		pace: "0'00\"",
		calories: 0,
		speed: 0,
		heartRate: 0,
	},
	onToggle,
	onPause,
	className = "",
}: FloatingTrackingUIProps) {
	const [showExpanded, setShowExpanded] = useState(false);
	const [currentTime] = useState(new Date());

	// Determine status
	const getStatusInfo = () => {
		if (!isTracking) {
			return { color: "bg-gray-500", text: "Ready", icon: PlayIcon };
		}
		if (isPaused) {
			return { color: "bg-orange-500", text: "Paused", icon: PlayIcon };
		}
		return { color: "bg-red-500", text: "Tracking", icon: PauseIcon };
	};

	const status = getStatusInfo();
	const StatusIcon = status.icon;

	return (
		<motion.div
			drag
			className={`
				w-72 md:w-80
				pointer-events-auto
				transition-all duration-300 ease-in-out
				${showExpanded ? "translate-y-0" : "-translate-y-16"}
				${className}
			`}
		>
			<Card
				className={`
					p-3 shadow-2xl border-2
					${status.color.replace("bg-", "border-")}
					backdrop-blur-md bg-card/90
					shadow-black/20
				`}
			>
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center space-x-2">
						<div
							className={`
							w-2 h-2 rounded-full animate-pulse
							${status.color}
						`}
						/>
						<span className="text-sm font-medium">{status.text}</span>
					</div>

					<div className="flex items-center space-x-2">
						<button
							type="button"
							onClick={() => setShowExpanded(!showExpanded)}
							className="p-1 rounded hover:bg-muted/50 transition-colors"
						>
							<TrendingUpIcon
								className={`w-4 h-4 transition-transform ${showExpanded ? "rotate-180" : ""}`}
							/>
						</button>

						{/* Control Button */}
						<button
							type="button"
							onClick={isTracking ? onPause : onToggle}
							className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
						>
							<StatusIcon className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* Basic Stats - Always Visible */}
				<div className="grid grid-cols-3 gap-2 text-center">
					<div className="p-2 bg-muted/50 rounded">
						<MapPinIcon className="w-3 h-3 mx-auto mb-1 text-muted-foreground" />
						<p className="text-lg font-bold">{stats.distance.toFixed(1)}</p>
						<p className="text-xs text-muted-foreground">km</p>
					</div>
					<div className="p-2 bg-muted/50 rounded">
						<TimerIcon className="w-3 h-3 mx-auto mb-1 text-muted-foreground" />
						<p className="text-lg font-bold">{stats.duration}</p>
						<p className="text-xs text-muted-foreground">time</p>
					</div>
					<div className="p-2 bg-muted/50 rounded">
						<ActivityIcon className="w-3 h-3 mx-auto mb-1 text-muted-foreground" />
						<p className="text-lg font-bold">{stats.pace}</p>
						<p className="text-xs text-muted-foreground">pace</p>
					</div>
				</div>

				{/* Expanded Stats */}
				{showExpanded && (
					<div className="mt-3 pt-3 border-t border-border space-y-2">
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div className="flex justify-between p-2 bg-muted/30 rounded">
								<span className="text-muted-foreground">Speed:</span>
								<span className="font-medium">
									{stats.speed.toFixed(1)} km/h
								</span>
							</div>
							<div className="flex justify-between p-2 bg-muted/30 rounded">
								<span className="text-muted-foreground">Calories:</span>
								<span className="font-medium">{stats.calories}</span>
							</div>
							<div className="flex justify-between p-2 bg-muted/30 rounded">
								<span className="text-muted-foreground">Heart Rate:</span>
								<span className="font-medium">{stats.heartRate} bpm</span>
							</div>
							<div className="flex justify-between p-2 bg-muted/30 rounded">
								<span className="text-muted-foreground">Time:</span>
								<span className="font-medium">
									{currentTime.toLocaleTimeString()}
								</span>
							</div>
						</div>
					</div>
				)}
			</Card>
		</motion.div>
	);
}
