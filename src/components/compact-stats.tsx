import { Card } from "konsta/react";
import { TrendingUpIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface CompactStatProps {
	title: string;
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	trend?: {
		value: string;
		direction: "up" | "down";
	};
	color?: "blue" | "green" | "orange" | "purple";
}

function CompactStat({
	title,
	value,
	icon: Icon,
	trend,
	color = "blue",
}: CompactStatProps) {
	const colorClasses = {
		blue: "bg-blue-100 text-blue-600",
		green: "bg-green-100 text-green-600",
		orange: "bg-orange-100 text-orange-600",
		purple: "bg-purple-100 text-purple-600",
	};

	return (
		<div className="flex flex-col items-center text-center p-3 min-w-[100px]">
			<div className={cn("p-2 rounded-lg mb-2", colorClasses[color])}>
				<Icon className="w-5 h-5" />
			</div>
			<p className="text-lg font-bold leading-tight">{value}</p>
			<p className="text-xs text-muted-foreground leading-tight">{title}</p>
			{trend && (
				<div className={cn("flex items-center text-xs text-green-600 mt-1")}>
					<TrendingUpIcon className="w-3 h-3 mr-1" />
					<span className="truncate">{trend.value.split(" ")[0]}</span>
				</div>
			)}
		</div>
	);
}

interface CompactStatsProps {
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

export function CompactStats({ stats }: CompactStatsProps) {
	return (
		<Card className="p-0">
			<div className="flex overflow-x-auto space-x-0">
				{stats.map((stat, index) => (
					<CompactStat key={`${stat.title}-${index}`} {...stat} />
				))}
			</div>
		</Card>
	);
}
