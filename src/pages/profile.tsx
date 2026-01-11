import { Page, List, ListItem, Block, BlockTitle, Button } from "konsta/react";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";
import { UserIcon, EditIcon, CameraIcon } from "@/components/icons";

export const ProfileRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/profile",
	component: () => <Profile />,
});

export default function Profile() {
	return (
		<Page className="pb-20">
			{/* Profile Header */}
			<div className="flex flex-col items-center py-6 bg-gradient-to-b from-primary/10 to-transparent">
				<div className="relative">
					<div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
						<UserIcon className="w-12 h-12 text-primary" />
					</div>
					<div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer">
						<CameraIcon className="w-4 h-4 text-white" />
					</div>
				</div>
				<h2 className="text-xl font-semibold mt-3">John Doe</h2>
				<p className="text-muted-foreground">john.doe@example.com</p>
			</div>

			{/* Basic Information */}
			<BlockTitle>Basic Information</BlockTitle>
			<List strong inset>
				<ListItem
					title="Full Name"
					after="John Doe"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
				<ListItem
					title="Email"
					after="john.doe@example.com"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
				<ListItem
					title="Phone"
					after="+1 234 567 8900"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
				<ListItem
					title="Date of Birth"
					after="Jan 15, 1990"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
			</List>

			{/* Body Measurements */}
			<BlockTitle>Body Measurements</BlockTitle>
			<List strong inset>
				<ListItem
					title="Height"
					after="5'10&quot; (178 cm)"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
				<ListItem
					title="Weight"
					after="165 lbs (75 kg)"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
				<ListItem
					title="Age"
					after="34 years"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
				<ListItem
					title="Gender"
					after="Male"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
				<ListItem
					title="Activity Level"
					after="Moderate"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
			</List>

			{/* Fitness Goals */}
			<BlockTitle>Fitness Goals</BlockTitle>
			<List strong inset>
				<ListItem
					title="Daily Step Goal"
					after="10,000 steps"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
				<ListItem
					title="Weekly Exercise"
					after="3-4 times"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
				<ListItem
					title="Target Weight"
					after="160 lbs (73 kg)"
					media={<EditIcon className="w-4 h-4 text-muted-foreground" />}
				/>
			</List>

			{/* Action Buttons */}
			<Block className="px-4">
				<Button large className="w-full mb-3">
					Save Changes
				</Button>
				<Button large outline className="w-full text-red-500 border-red-500">
					Delete Account
				</Button>
			</Block>
		</Page>
	);
}
