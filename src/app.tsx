import { App } from "konsta/react";
import { Toaster } from "sonner";
import { HomeRoute } from "@/pages/home";
import { TrackerRoute } from "@/pages/tracker";
import { SettingsRoute } from "@/pages/settings";
import { ProfileRoute } from "@/pages/profile";
import { AppearanceRoute } from "@/pages/appearance";
import { TestRoute } from "@/pages/test";
import BottomNav from "@/components/bottom-nav";

import {
	Outlet,
	RouterProvider,
	createRouter,
	createRootRoute,
} from "@tanstack/react-router";

import "./styles/app.css";
import { useTheme } from "./store/theme";

export const rootRoute = createRootRoute({
	component: () => {
		const theme = useTheme();

		return (
			<App className={theme}>
				<Toaster />
				<Outlet />
				<BottomNav />
			</App>
		);
	},
});

const routeTree = rootRoute.addChildren([
	HomeRoute,
	TrackerRoute,
	SettingsRoute,
	ProfileRoute,
	AppearanceRoute,
	TestRoute,
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
