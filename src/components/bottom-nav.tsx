import { Tabbar, TabbarLink } from "konsta/react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { HomeIcon, MapIcon, SettingsIcon } from "lucide-react";

export default function BottomNav() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Tabbar labels className="left-0 bottom-0 fixed">
			<TabbarLink
				active={location.pathname === "/"}
				onClick={() => navigate({ to: "/" })}
				icon={<HomeIcon className="w-6 h-6" />}
				label="Home"
			/>
			<TabbarLink
				active={location.pathname === "/tracker"}
				onClick={() => navigate({ to: "/tracker" })}
				icon={<MapIcon className="w-6 h-6" />}
				label="Tracker"
			/>
			<TabbarLink
				active={location.pathname === "/settings"}
				onClick={() => navigate({ to: "/settings" })}
				icon={<SettingsIcon className="w-6 h-6" />}
				label="Settings"
			/>
		</Tabbar>
	);
}
