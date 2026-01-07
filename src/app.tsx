import { App } from "konsta/react";
import { Toaster } from "sonner";
import { usePage } from "@/hooks/use-page";
import Home from "@/pages/home";
import Tracker from "@/pages/tracker";

export default function MainApp() {
	const [page] = usePage();

	return (
		<App>
			{page === "Home" && <Home />}
			{page === "Tracker" && <Tracker />}
			<Toaster />
		</App>
	);
}
