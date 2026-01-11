import { Page, BlockTitle } from "konsta/react";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";
import { ThemeToggle } from "@/components/theme-toggle";
import { PaletteIcon, BrushIcon } from "@/components/icons";

export const AppearanceRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/appearance",
	component: () => <Appearance />,
});

export default function Appearance() {
	return (
		<Page className="pb-20">
			<div className="px-4 py-6 space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-2xl font-bold flex items-center gap-2">
						<PaletteIcon className="w-6 h-6" />
						Appearance
					</h1>
					<p className="text-muted-foreground">
						Customize your app experience and visual preferences
					</p>
				</div>

				{/* Theme Section */}
				<ThemeToggle />

				{/* Additional Appearance Settings */}
				<div className="space-y-4">
					<BlockTitle className="px-0">Display Options</BlockTitle>

					<div className="space-y-3">
						<div className="flex items-center justify-between p-4 bg-card rounded-lg border">
							<div className="flex items-center space-x-3">
								<div className="p-2 rounded-lg bg-muted">
									<BrushIcon className="w-5 h-5" />
								</div>
								<div>
									<p className="font-medium">Font Size</p>
									<p className="text-sm text-muted-foreground">
										Adjust text size throughout the app
									</p>
								</div>
							</div>
							<select className="px-3 py-1 rounded-md border bg-background">
								<option>Small</option>
								<option selected>Medium</option>
								<option>Large</option>
							</select>
						</div>

						<div className="flex items-center justify-between p-4 bg-card rounded-lg border">
							<div className="flex items-center space-x-3">
								<div className="p-2 rounded-lg bg-muted">
									<PaletteIcon className="w-5 h-5" />
								</div>
								<div>
									<p className="font-medium">Color Accent</p>
									<p className="text-sm text-muted-foreground">
										Choose your preferred accent color
									</p>
								</div>
							</div>
							<div className="flex gap-2">
								<div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-primary" />
								<div className="w-6 h-6 rounded-full bg-green-500" />
								<div className="w-6 h-6 rounded-full bg-purple-500" />
								<div className="w-6 h-6 rounded-full bg-orange-500" />
							</div>
						</div>

						<div className="flex items-center justify-between p-4 bg-card rounded-lg border">
							<div className="flex items-center space-x-3">
								<div className="p-2 rounded-lg bg-muted">
									<BrushIcon className="w-5 h-5" />
								</div>
								<div>
									<p className="font-medium">Animations</p>
									<p className="text-sm text-muted-foreground">
										Enable transitions and micro-interactions
									</p>
								</div>
							</div>
							<button
								type="button"
								className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors"
							>
								<span className="inline-block h-4 w-4 transform rounded-full bg-primary-foreground transition-transform translate-x-6" />
							</button>
						</div>

						<div className="flex items-center justify-between p-4 bg-card rounded-lg border">
							<div className="flex items-center space-x-3">
								<div className="p-2 rounded-lg bg-muted">
									<PaletteIcon className="w-5 h-5" />
								</div>
								<div>
									<p className="font-medium">Compact Mode</p>
									<p className="text-sm text-muted-foreground">
										Reduce spacing and padding for more content
									</p>
								</div>
							</div>
							<button
								type="button"
								className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors"
							>
								<span className="inline-block h-4 w-4 transform rounded-full bg-background transition-transform translate-x-1" />
							</button>
						</div>
					</div>
				</div>

				{/* Preview Section */}
				<div className="space-y-3">
					<BlockTitle className="px-0">Preview</BlockTitle>
					<div className="grid grid-cols-2 gap-3">
						<div className="p-4 bg-card rounded-lg border">
							<h3 className="font-medium mb-2">Card Component</h3>
							<p className="text-sm text-muted-foreground mb-3">
								This is how card elements appear in your theme
							</p>
							<button
								type="button"
								className="w-full py-2 bg-primary text-primary-foreground rounded-md"
							>
								Primary Button
							</button>
						</div>
						<div className="p-4 bg-muted rounded-lg">
							<h3 className="font-medium mb-2">Muted Section</h3>
							<p className="text-sm text-muted-foreground mb-3">
								This is how muted content appears
							</p>
							<button
								type="button"
								className="w-full py-2 bg-secondary text-secondary-foreground rounded-md"
							>
								Secondary Button
							</button>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}
