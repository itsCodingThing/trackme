import { Card, BlockTitle } from "konsta/react";
import { SunIcon, MoonIcon, MonitorIcon } from "@/components/icons";
import { useSavedThemePref, useSetTheme } from "@/store/theme";

export function ThemeToggle() {
	const setTheme = useSetTheme();
	const savedThemePref = useSavedThemePref();

	const themeOptions = [
		{
			value: "light" as const,
			label: "Light",
			description: "Light mode theme",
			icon: SunIcon,
		},
		{
			value: "dark" as const,
			label: "Dark",
			description: "Dark mode theme",
			icon: MoonIcon,
		},
		{
			value: "system" as const,
			label: "System",
			description: `Follow system setting (${savedThemePref})`,
			icon: MonitorIcon,
		},
	];

	return (
		<div className="space-y-3">
			<BlockTitle>Appearance</BlockTitle>

			<Card className="p-4">
				<div className="space-y-4">
					{themeOptions.map((option) => {
						const Icon = option.icon;
						const isActive = savedThemePref === option.value;

						return (
							<button
								key={option.value}
								type="button"
								className={`
									flex items-center justify-between w-full p-3 rounded-lg transition-all
									${
										isActive
											? "bg-primary/10 border-2 border-primary"
											: "bg-muted/30 border-2 border-transparent hover:bg-muted/50"
									}
								`}
								onClick={() => {
									setTheme(option.value);
								}}
							>
								<div className="flex items-center space-x-3">
									<div
										className={`
										p-2 rounded-lg
										${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
									`}
									>
										<Icon className="w-4 h-4" />
									</div>
									<div>
										<p className="font-medium">{option.label}</p>
										<p className="text-sm text-muted-foreground">
											{option.description}
										</p>
									</div>
								</div>

								{isActive && (
									<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
										<div className="w-2 h-2 rounded-full bg-primary-foreground" />
									</div>
								)}
							</button>
						);
					})}
				</div>
			</Card>

			{/* Preview Section */}
			<Card className="p-4">
				<p className="text-sm font-medium mb-3">Theme Preview</p>
				<div className="grid grid-cols-2 gap-3">
					<div className="p-3 bg-card rounded-lg border">
						<p className="text-xs font-medium mb-1">Card Background</p>
						<p className="text-xs text-muted-foreground">Sample text</p>
					</div>
					<div className="p-3 bg-muted rounded-lg">
						<p className="text-xs font-medium mb-1">Muted Background</p>
						<p className="text-xs text-muted-foreground">Sample text</p>
					</div>
				</div>
			</Card>
		</div>
	);
}
