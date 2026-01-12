import { Page, BlockTitle, Card, Button } from "konsta/react";
import { FloatingTrackingUI } from "@/components/floating-tracking-ui";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";

export const TestRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/test",
	component: () => <TestPage />,
});

export default function TestPage() {
	return (
		<Page className="pb-20">
			<div className="px-4 py-6 space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-2xl font-bold mb-2">Component Testing</h1>
					<p className="text-muted-foreground">
						Sandbox for testing and previewing components
					</p>
				</div>

				{/* Test Components */}
				<div className="space-y-6">
					<BlockTitle>Component Sandbox</BlockTitle>
					<Card className="p-4">
						<p className="text-muted-foreground">
							This is a sandbox area for testing and previewing components.
							Import and test any component here.
						</p>
						<div className="mt-4 space-y-2">
							<p className="text-sm font-medium">Available Components:</p>
							<ul className="text-xs text-muted-foreground list-disc list-inside">
								<li>StatsGrid - Statistics display</li>
								<li>WeeklyChart - Bar chart visualization</li>
								<li>CurrentGoals - Goal progress cards</li>
								<li>PastActivities - Activity list</li>
								<li>ThemeToggle - Theme selection</li>
								<li>BottomNav - Navigation component</li>
								<li>FloatingTrackingUI - Tracking overlay</li>
							</ul>
						</div>
					</Card>

					{/* Floating Tracking UI Demo */}
					<Card className="p-4">
						<BlockTitle className="px-0">Floating Tracking UI Demo</BlockTitle>
						<div className="relative h-96 bg-muted/30 rounded-lg overflow-hidden">
							<div className="absolute inset-0 flex items-center justify-center">
								<p className="text-muted-foreground">Map would go here</p>
							</div>

							{/* Demo with different states */}
							<div className="space-y-4">
								<BlockTitle className="px-0 text-sm">
									Different States:
								</BlockTitle>
								<div className="grid grid-cols-3 gap-4">
									{/* Ready State */}
									<div className="text-center">
										<p className="text-xs font-medium mb-2">Ready</p>
										<FloatingTrackingUI
											isTracking={false}
											stats={{
												distance: 0,
												duration: 0,
												pace: "0'00\"",
												calories: 0,
												speed: 0,
												heartRate: 0,
											}}
										/>
									</div>

									{/* Tracking State */}
									<div className="text-center">
										<p className="text-xs font-medium mb-2">Tracking</p>
										<FloatingTrackingUI
											isTracking={true}
											stats={{
												distance: 5.2,
												duration: 1834, // 30:34
												pace: "5'52\"",
												calories: 342,
												speed: 10.2,
												heartRate: 145,
											}}
											onPause={() => alert("Paused")}
										/>
									</div>

									{/* Paused State */}
									<div className="text-center">
										<p className="text-xs font-medium mb-2">Paused</p>
										<FloatingTrackingUI
											isTracking={true}
											isPaused={true}
											stats={{
												distance: 8.7,
												duration: 3120, // 52:00
												pace: "5'58\"",
												calories: 567,
												speed: 10.1,
												heartRate: 132,
											}}
											onToggle={() => alert("Resumed")}
										/>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>

				{/* Quick Actions */}
				<div className="space-y-3">
					<BlockTitle>Quick Actions</BlockTitle>

					<Card className="p-4">
						<div className="grid grid-cols-2 gap-3">
							<Button>Home</Button>
							<Button>Settings</Button>
							<Button>Profile</Button>
							<Button>Appearance</Button>
						</div>
					</Card>

					<Card className="p-4">
						<BlockTitle className="px-0">Navigation Tests</BlockTitle>
						<div className="space-y-2 text-sm">
							<p>Current pathname: {window.location.pathname}</p>
							<p>Available routes:</p>
							<ul className="list-disc list-inside text-muted-foreground">
								<li>/ - Home</li>
								<li>/tracker - Tracker</li>
								<li>/settings - Settings</li>
								<li>/profile - Profile</li>
								<li>/appearance - Appearance</li>
								<li>/test - This page</li>
							</ul>
						</div>
					</Card>

					<Card className="p-4">
						<BlockTitle className="px-0">Component Grid</BlockTitle>
						<div className="grid grid-cols-2 gap-3 text-xs">
							<div className="p-2 bg-card border rounded">Stat Card</div>
							<div className="p-2 bg-muted rounded">Chart Bar</div>
							<div className="p-2 bg-primary/10 rounded">Goal Card</div>
							<div className="p-2 bg-accent rounded">Activity Item</div>
						</div>
					</Card>
				</div>
			</div>
		</Page>
	);
}
