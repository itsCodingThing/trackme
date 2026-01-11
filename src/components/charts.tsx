import { Card, BlockTitle } from "konsta/react";

interface ChartBarProps {
	value: number;
	maxValue: number;
	label: string;
	color?: string;
}

function ChartBar({
	value,
	maxValue,
	label,
	color = "bg-primary",
}: ChartBarProps) {
	const heightPercentage = (value / maxValue) * 100;

	return (
		<div className="flex flex-col items-center flex-1">
			<div className="w-full flex flex-col items-center justify-end h-20">
				<div
					className={`w-6 rounded-t ${color} transition-all duration-300`}
					style={{ height: `${heightPercentage}%` }}
				/>
			</div>
			<p className="text-xs text-muted-foreground mt-2 text-center">{label}</p>
		</div>
	);
}

interface WeeklyChartProps {
	data: {
		day: string;
		distance: number;
		label: string;
	}[];
	title?: string;
}

export function WeeklyChart({
	data,
	title = "Weekly Distance",
}: WeeklyChartProps) {
	const maxDistance = Math.max(...data.map((d) => d.distance));

	return (
		<Card className="p-4">
			<BlockTitle className="px-0">{title}</BlockTitle>
			<div className="flex items-end justify-between mt-4">
				{data.map((item, index) => (
					<ChartBar
						key={`${item.day}-${index}`}
						value={item.distance}
						maxValue={maxDistance}
						label={item.label}
						color={item.distance > 0 ? "bg-primary" : "bg-muted"}
					/>
				))}
			</div>
			<div className="flex justify-between mt-4 text-sm text-muted-foreground">
				<span>0 km</span>
				<span>{maxDistance} km</span>
			</div>
		</Card>
	);
}

interface ProgressRingProps {
	percentage: number;
	size?: number;
	strokeWidth?: number;
	color?: string;
}

export function ProgressRing({
	percentage,
	size = 80,
	strokeWidth = 8,
	color = "stroke-primary",
}: ProgressRingProps) {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div className="relative inline-flex items-center justify-center">
			<svg
				width={size}
				height={size}
				className="transform -rotate-90"
				aria-hidden="true"
			>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					className="text-muted-foreground/20"
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					className={`${color} transition-all duration-300`}
					strokeLinecap="round"
				/>
			</svg>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-lg font-semibold">{percentage}%</span>
			</div>
		</div>
	);
}
