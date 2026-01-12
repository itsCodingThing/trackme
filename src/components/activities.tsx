import { List, ListItem, Card, BlockTitle } from "konsta/react";
import { format } from "date-fns";
import { MapIcon, TimerIcon, TrendingUpIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface Activity {
	id: string;
	date: Date;
	type: "running" | "walking" | "cycling";
	distance: number;
	duration: number; // in minutes
	pace: string; // min/km
	calories: number;
}

interface PastActivitiesProps {
	activities: Activity[];
}

export function PastActivities({ activities }: PastActivitiesProps) {
	const getActivityIcon = (type: Activity["type"]) => {
		switch (type) {
			case "running":
				return <TrendingUpIcon className="w-5 h-5 text-primary" />;
			case "walking":
				return <MapIcon className="w-5 h-5 text-green-600" />;
			case "cycling":
				return <MapIcon className="w-5 h-5 text-orange-600" />;
		}
	};

	const getActivityColor = (type: Activity["type"]) => {
		switch (type) {
			case "running":
				return "text-primary";
			case "walking":
				return "text-green-600";
			case "cycling":
				return "text-orange-600";
		}
	};

	if (activities.length === 0) {
		return (
			<Card className="p-6 text-center">
				<p className="text-muted-foreground">No activities yet</p>
				<p className="text-sm text-muted-foreground mt-2">
					Start your first activity to see it here!
				</p>
			</Card>
		);
	}

	return (
		<div className="space-y-3">
			<BlockTitle className="px-0">Recent Activities</BlockTitle>
			<List strong inset>
				{activities.map((activity) => (
					<ListItem
						key={activity.id}
						title={format(activity.date, "MMM d, yyyy")}
						subtitle={
							<div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
								<span className="capitalize">{activity.type}</span>
								<span>•</span>
								<span>{format(activity.date, "h:mm a")}</span>
							</div>
						}
						media={getActivityIcon(activity.type)}
						after={
							<div className="text-right">
								<p
									className={cn(
										"font-semibold",
										getActivityColor(activity.type),
									)}
								>
									{activity.distance} km
								</p>
								<div className="flex items-center gap-1 text-xs text-muted-foreground">
									<TimerIcon className="w-3 h-3" />
									<span>{activity.duration}m</span>
								</div>
							</div>
						}
					/>
				))}
			</List>
		</div>
	);
}

// Sample data for demonstration
export const sampleActivities: Activity[] = [
	{
		id: "1",
		date: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
		type: "running",
		distance: 5.2,
		duration: 32,
		pace: "6'10\"",
		calories: 320,
	},
	{
		id: "2",
		date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
		type: "walking",
		distance: 3.1,
		duration: 45,
		pace: "14'30\"",
		calories: 150,
	},
	{
		id: "3",
		date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
		type: "running",
		distance: 8.7,
		duration: 55,
		pace: "6'20\"",
		calories: 540,
	},
	{
		id: "4",
		date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
		type: "cycling",
		distance: 12.3,
		duration: 42,
		pace: "3'25\"",
		calories: 480,
	},
];
