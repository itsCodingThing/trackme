import { Card, Button, BlockTitle } from "konsta/react";
import { ProgressRing } from "@/components/charts";

interface GoalCardProps {
	title: string;
	current: number;
	target: number;
	unit: string;
	icon: React.ComponentType<{ className?: string }>;
	color?: string;
}

function GoalCard({
	title,
	current,
	target,
	unit,
	icon: Icon,
	color = "text-primary",
}: GoalCardProps) {
	const percentage = Math.min(Math.round((current / target) * 100), 100);

	return (
		<Card className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<div className="flex items-center mb-2">
						<Icon className={`w-5 h-5 mr-2 ${color}`} />
						<h3 className="font-semibold">{title}</h3>
					</div>
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-bold">{current}</span>
						<span className="text-muted-foreground">
							/ {target} {unit}
						</span>
					</div>
					<div className="w-full bg-muted rounded-full h-2 mt-3">
						<div
							className="bg-primary h-2 rounded-full transition-all duration-300"
							style={{ width: `${percentage}%` }}
						/>
					</div>
				</div>
				<div className="ml-4">
					<ProgressRing percentage={percentage} size={60} />
				</div>
			</div>
		</Card>
	);
}

interface CurrentGoalsProps {
	goals: {
		title: string;
		current: number;
		target: number;
		unit: string;
		icon: React.ComponentType<{ className?: string }>;
		color?: string;
	}[];
}

export function CurrentGoals({ goals }: CurrentGoalsProps) {
	return (
		<div className="space-y-3">
			<BlockTitle className="px-0">Current Goals</BlockTitle>
			{goals.map((goal, index) => (
				<GoalCard key={`${goal.title}-${index}`} {...goal} />
			))}
		</div>
	);
}

export function WeeklySummary() {
	return (
		<Card className="p-4">
			<BlockTitle className="px-0 mb-4">Weekly Summary</BlockTitle>
			<div className="grid grid-cols-3 gap-4 text-center">
				<div>
					<p className="text-2xl font-bold text-primary">5</p>
					<p className="text-sm text-muted-foreground">Activities</p>
				</div>
				<div>
					<p className="text-2xl font-bold text-primary">24.5</p>
					<p className="text-sm text-muted-foreground">km Total</p>
				</div>
				<div>
					<p className="text-2xl font-bold text-primary">2:45</p>
					<p className="text-sm text-muted-foreground">Duration</p>
				</div>
			</div>
			<Button className="w-full mt-4">Start New Activity</Button>
		</Card>
	);
}
