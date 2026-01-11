import { Tabbar, TabbarLink } from "konsta/react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { HomeIcon, MapIcon, SettingsIcon } from "lucide-react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

const showNav = atom(true);

export function HideBottomNav() {
	const setShow = useSetAtom(showNav);

	useEffect(() => {
		setShow(false);

		return () => {
			setShow(true);
		};
	}, []);

	return null;
}

export default function BottomNav() {
	const isNavVisible = useAtomValue(showNav);
	const location = useLocation();
	const navigate = useNavigate();

	if (isNavVisible) {
		return (
			<Tabbar labels className="fixed left-0 bottom-0">
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

	return null;
}
