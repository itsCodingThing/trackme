import { format } from "date-fns";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { distanceBetween, type Point } from "@/hooks/useGeoTracker";

interface TrackingTableProps {
	route: Point[];
}

export default function TrackingTable(props: TrackingTableProps) {
	return (
		<Table>
			<TableCaption>Your recent activity.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Time</TableHead>
					<TableHead className="text-right">Distance</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.route.map((point, i) => {
					const time = format(point.timestamp, "MM/dd/yyyy");

					if (i === 0) {
						return (
							<TableRow key={point.timestamp}>
								<TableCell className="font-medium">{time}</TableCell>
								<TableCell className="text-right">0</TableCell>
							</TableRow>
						);
					}

					const distance = distanceBetween(props.route[i - 1], point);
					return (
						<TableRow key={point.timestamp}>
							<TableCell className="font-medium">{time}</TableCell>
							<TableCell className="text-right">{distance}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
