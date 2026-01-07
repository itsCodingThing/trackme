import { Page, Fab } from "konsta/react";
import { PlusIcon } from "@/components/icons";
import { usePage } from "@/hooks/use-page";

export default function Home() {
	const [_, setPage] = usePage();

	return (
		<Page className="bg-pink-200">
			<Fab
				className="fixed left-1/2 bottom-safe-4 transform -translate-x-1/2 z-20"
				icon={<PlusIcon className="w-6 h-6" />}
				text="Start"
				textPosition="after"
				onClick={() => {
					setPage("Tracker");
				}}
			/>
		</Page>
	);
}
