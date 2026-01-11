import { App } from "konsta/react";
import { Toaster } from "sonner";
import { HomeRoute } from "@/pages/home";
import { TrackerRoute } from "@/pages/tracker";
import { SettingsRoute } from "@/pages/settings";
import { ProfileRoute } from "@/pages/profile";
import BottomNav from "@/components/bottom-nav";
import {
	Outlet,
	RouterProvider,
	createRouter,
	createRootRoute,
} from "@tanstack/react-router";

import "./styles/app.css";

export const rootRoute = createRootRoute({
	component: () => {
		return (
			<App>
				<Outlet />
				<BottomNav />
				<Toaster />
			</App>
		);
	},
});

const routeTree = rootRoute.addChildren([
	HomeRoute,
	TrackerRoute,
	SettingsRoute,
	ProfileRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export default function MainApp() {
	return <RouterProvider router={router} />;
}
