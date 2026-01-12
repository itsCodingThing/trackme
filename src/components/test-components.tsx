import { Card, BlockTitle, List, ListItem } from "konsta/react";
import { StatsGrid } from "@/components/statistics";
import { WeeklyChart } from "@/components/charts";
import { CurrentGoals } from "@/components/goals";
import { PastActivities, sampleActivities } from "@/components/activities";
import { ThemeToggle } from "@/components/theme-toggle";

// Sample data for testing
const statsData = [
	{
		title: "Test Distance",
		value: "12.3 km",
		subtitle: "Today",
		icon: () => <div className="w-5 h-5 bg-blue-500 rounded" />,
		trend: { value: "5% increase", direction: "up" as const },
		color: "blue" as const,
	},
	{
		title: "Test Time",
		value: "45m",
		subtitle: "Duration",
		icon: () => <div className="w-5 h-5 bg-green-500 rounded" />,
		trend: { value: "2% faster", direction: "up" as const },
		color: "green" as const,
	},
];

const weeklyData = [
	{ day: "Mon", distance: 3.2, label: "M" },
	{ day: "Tue", distance: 0, label: "T" },
	{ day: "Wed", distance: 5.1, label: "W" },
	{ day: "Thu", distance: 2.8, label: "T" },
	{ day: "Fri", distance: 0, label: "F" },
	{ day: "Sat", distance: 8.7, label: "S" },
	{ day: "Sun", distance: 4.5, label: "S" },
];

const goals = [
	{
		title: "Test Steps",
		current: 7500,
		target: 10000,
		unit: "steps",
		icon: () => <div className="w-5 h-5 bg-purple-500 rounded" />,
		color: "text-purple-600",
	},
];

export function TestComponents() {
	return (
		<div className="space-y-6">
			{/* Stats Grid Test */}
			<div className="space-y-3">
				<BlockTitle>Stats Grid Test</BlockTitle>
				<StatsGrid stats={statsData} />
			</div>

			{/* Chart Test */}
			<div className="space-y-3">
				<BlockTitle>Weekly Chart Test</BlockTitle>
				<WeeklyChart data={weeklyData} />
			</div>

			{/* Goals Test */}
			<div className="space-y-3">
				<BlockTitle>Goals Test</BlockTitle>
				<CurrentGoals goals={goals} />
			</div>

			{/* Activities Test */}
			<div className="space-y-3">
				<BlockTitle>Past Activities Test</BlockTitle>
				<PastActivities activities={sampleActivities.slice(0, 2)} />
			</div>

			{/* Theme Toggle Test */}
			<div className="space-y-3">
				<BlockTitle>Theme Toggle Test</BlockTitle>
				<ThemeToggle />
			</div>

			{/* Basic Components Test */}
			<Card className="p-4">
				<BlockTitle className="px-0">Basic Components</BlockTitle>
				<List strong inset>
					<ListItem title="Test Item 1" after=">" />
					<ListItem title="Test Item 2" after=">" />
					<ListItem title="Test Item 3" after=">" />
				</List>
			</Card>
		</div>
	);
}
