import { atom, useAtom } from "jotai";

const Screens = {
	home: "Home",
	tracker: "Tracker",
} as const;

type Screen = (typeof Screens)[keyof typeof Screens];

const page = atom<Screen>("Home");

export function usePage() {
	return useAtom(page);
}
