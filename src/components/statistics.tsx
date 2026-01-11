import { Card } from "konsta/react";
import { TrendingUpIcon } from "@/components/icons";

interface StatCardProps {
	title: string;
	value: string;
	subtitle?: string;
	icon: React.ComponentType<{ className?: string }>;
	trend?: {
		value: string;
		direction: "up" | "down";
	};
	color?: "blue" | "green" | "orange" | "purple";
}

export function StatCard({
	title,
	value,
	subtitle,
	icon: Icon,
	trend,
	color = "blue",
}: StatCardProps) {
	const colorClasses = {
		blue: "bg-blue-100 text-blue-600",
		green: "bg-green-100 text-green-600",
		orange: "bg-orange-100 text-orange-600",
		purple: "bg-purple-100 text-purple-600",
	};

	const trendColorClasses = {
		up: "text-green-600",
		down: "text-red-600",
	};

	return (
		<Card className="p-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<div
						className={`p-2 rounded-lg ${colorClasses[color]} flex-shrink-0`}
					>
						<Icon className="w-5 h-5" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-xs text-muted-foreground leading-tight">
							{title}
						</p>
						<p className="text-lg font-bold leading-tight">{value}</p>
						{subtitle && (
							<p className="text-xs text-muted-foreground leading-tight">
								{subtitle}
							</p>
						)}
						{trend && (
							<div
								className={`flex items-center text-xs ${trendColorClasses[trend.direction]} mt-1`}
							>
								<TrendingUpIcon className="w-3 h-3 mr-1 flex-shrink-0" />
								<span className="truncate">{trend.value}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
}

interface StatsGridProps {
	stats: {
		title: string;
		value: string;
		subtitle?: string;
		icon: React.ComponentType<{ className?: string }>;
		trend?: {
			value: string;
			direction: "up" | "down";
		};
		color?: "blue" | "green" | "orange" | "purple";
	}[];
}

export function StatsGrid({ stats }: StatsGridProps) {
	return (
		<div className="space-y-3">
			{stats.map((stat, index) => (
				<StatCard key={`${stat.title}-${index}`} {...stat} />
			))}
		</div>
	);
}
