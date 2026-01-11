import { App } from "konsta/react";
import { Toaster } from "sonner";
import { HomeRoute } from "@/pages/home";
import { TrackerRoute } from "@/pages/tracker";
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
				<Toaster />
			</App>
		);
	},
});

const routeTree = rootRoute.addChildren([HomeRoute, TrackerRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export default function MainApp() {
	return <RouterProvider router={router} />;
}
