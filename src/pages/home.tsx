import { Page, Fab, Card, Chip } from "konsta/react";
import { PlusIcon, WifiOffIcon } from "@/components/icons";
import { usePage } from "@/hooks/use-page";
import { useNetworkState } from "@uidotdev/usehooks";

export default function Home() {
	const [_, setPage] = usePage();
	const network = useNetworkState();

	return (
		<Page className="bg-pink-200">
			{network.online ? (
				<Fab
					className="fixed left-1/2 bottom-safe-4 transform -translate-x-1/2 z-20"
					icon={<PlusIcon className="w-6 h-6" />}
					text="Start"
					textPosition="after"
					onClick={() => {
						setPage("Tracker");
					}}
				/>
			) : (
				<Card outline>
					<div className="flex justify-between items-center">
						<span>Your offline</span>
						<Chip
							className="animate-pulse text-red-500"
							media={<WifiOffIcon className="w-4" />}
						>
							offline
						</Chip>
					</div>
				</Card>
			)}
		</Page>
	);
}
