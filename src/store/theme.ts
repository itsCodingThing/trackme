import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Theme = "light" | "dark" | "system";

const themeAtom = atomWithStorage<Theme>("trackme-theme", "system");
const resolvedThemeAtom = atom<"light" | "dark">((get) => {
	const theme = get(themeAtom);

	if (theme === "system") {
		if (typeof window !== "undefined") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}

		return "light";
	}

	return theme as "light" | "dark";
});

export function useTheme() {
	return useAtomValue(resolvedThemeAtom);
}

export function useSetTheme() {
	return useSetAtom(themeAtom);
}

export function useSavedThemePref() {
	return useAtomValue(themeAtom);
}
