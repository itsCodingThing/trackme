import { Page, Card, Chip } from "konsta/react";
import { WifiOffIcon } from "@/components/icons";
import { useNetworkState } from "@uidotdev/usehooks";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";
import { CompactStats } from "@/components/compact-stats";
import { WeeklyChart } from "@/components/charts";
import { CurrentGoals, WeeklySummary } from "@/components/goals";
import { PastActivities, sampleActivities } from "@/components/activities";
import {
	TrendingUpIcon,
	ActivityIcon,
	TimerIcon,
	MapPinIcon,
} from "@/components/icons";

export const HomeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <Home />,
});

export default function Home() {
	const network = useNetworkState();

	// Sample data
	const weeklyData = [
		{ day: "Mon", distance: 3.2, label: "M" },
		{ day: "Tue", distance: 0, label: "T" },
		{ day: "Wed", distance: 5.1, label: "W" },
		{ day: "Thu", distance: 2.8, label: "T" },
		{ day: "Fri", distance: 0, label: "F" },
		{ day: "Sat", distance: 8.7, label: "S" },
		{ day: "Sun", distance: 4.5, label: "S" },
	];

	const currentGoals = [
		{
			title: "Daily Steps",
			current: 7542,
			target: 10000,
			unit: "steps",
			icon: ActivityIcon,
			color: "text-blue-600",
		},
		{
			title: "Weekly Distance",
			current: 24.5,
			target: 30,
			unit: "km",
			icon: MapPinIcon,
			color: "text-green-600",
		},
	];

	const statsData = [
		{
			title: "Total Distance",
			value: "24.5 km",
			subtitle: "This week",
			icon: MapPinIcon,
			trend: { value: "12% vs last week", direction: "up" as const },
			color: "green" as const,
		},
		{
			title: "Activities",
			value: "5",
			subtitle: "This week",
			icon: ActivityIcon,
			trend: { value: "2 more than last week", direction: "up" as const },
			color: "blue" as const,
		},
		{
			title: "Avg Pace",
			value: "6'15\"",
			subtitle: "Per km",
			icon: TimerIcon,
			trend: { value: "5% faster", direction: "up" as const },
			color: "orange" as const,
		},
		{
			title: "Calories",
			value: "1,250",
			subtitle: "Burned",
			icon: TrendingUpIcon,
			trend: { value: "8% increase", direction: "up" as const },
			color: "purple" as const,
		},
	];

	if (!network.online) {
		return (
			<Page className="bg-pink-200 pb-20">
				<Card outline>
					<div className="flex justify-between items-center">
						<span>You're offline</span>
						<Chip
							className="animate-pulse text-red-500"
							media={<WifiOffIcon className="w-4" />}
						>
							offline
						</Chip>
					</div>
				</Card>
			</Page>
		);
	}

	return (
		<Page className="bg-gradient-to-b from-primary/5 to-white pb-20">
			<div className="px-4 py-6 space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-2xl font-bold">Welcome back, John!</h1>
					<p className="text-muted-foreground">Ready for today's run?</p>
				</div>

				{/* Weekly Summary */}
				<WeeklySummary />

				{/* Compact Stats */}
				<CompactStats stats={statsData} />

				{/* Weekly Chart */}
				<WeeklyChart data={weeklyData} />

				{/* Current Goals */}
				<CurrentGoals goals={currentGoals} />

				{/* Past Activities */}
				<PastActivities activities={sampleActivities.slice(0, 3)} />
			</div>
		</Page>
	);
}
