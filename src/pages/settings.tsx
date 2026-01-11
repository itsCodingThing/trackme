import { Page, List, ListItem, Block, BlockTitle, Toggle } from "konsta/react";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { rootRoute } from "@/app";
import {
	UserIcon,
	BellIcon,
	ShieldIcon,
	HelpCircleIcon,
	InfoIcon,
	MapPinIcon,
	ActivityIcon,
	HardDriveIcon,
	PaletteIcon,
} from "@/components/icons";

export const SettingsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/settings",
	component: () => <Settings />,
});

export default function Settings() {
	const navigate = useNavigate({ from: "/settings" });

	return (
		<Page className="pb-20">
			<BlockTitle>Settings</BlockTitle>

			<List strong inset>
				<ListItem
					title="Profile"
					media={<UserIcon className="w-5 h-5" />}
					after=">"
					onClick={() => navigate({ to: "/profile" })}
				/>
				<ListItem
					title="Appearance"
					media={<PaletteIcon className="w-5 h-5" />}
					after=">"
					onClick={() => navigate({ to: "/appearance" })}
				/>
				<ListItem
					title="Notifications"
					media={<BellIcon className="w-5 h-5" />}
					after=">"
				/>
				<ListItem
					title="Privacy"
					media={<ShieldIcon className="w-5 h-5" />}
					after=">"
				/>
			</List>

			<BlockTitle>Permissions</BlockTitle>
			<List strong inset>
				<ListItem
					title="Geolocation"
					media={<MapPinIcon className="w-5 h-5" />}
					after={<Toggle defaultChecked />}
				/>
				<ListItem
					title="Motion Sensors"
					media={<ActivityIcon className="w-5 h-5" />}
					after={<Toggle defaultChecked />}
				/>
				<ListItem
					title="Storage Access"
					media={<HardDriveIcon className="w-5 h-5" />}
					after={<Toggle defaultChecked />}
				/>
			</List>

			<BlockTitle>Support</BlockTitle>
			<List strong inset>
				<ListItem
					title="Help Center"
					media={<HelpCircleIcon className="w-5 h-5" />}
					after=">"
				/>
				<ListItem
					title="About"
					media={<InfoIcon className="w-5 h-5" />}
					after=">"
				/>
			</List>

			<Block className="mt-8">
				<p className="text-center text-sm text-muted-foreground">
					TrackMe v1.0.0
				</p>
			</Block>
		</Page>
	);
}
