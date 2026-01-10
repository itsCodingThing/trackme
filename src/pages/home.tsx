import { Page, Fab, Card, Chip } from "konsta/react";
import { PlusIcon, WifiOffIcon } from "@/components/icons";
import { useNetworkState } from "@uidotdev/usehooks";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { rootRoute } from "@/app";

export const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <Home />,
});

export default function Home() {
	const navigate = useNavigate({ from: "/" });
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
						navigate({ to: "/tracker" });
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
