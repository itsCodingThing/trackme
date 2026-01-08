import * as turf from "@turf/turf";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface Point {
	lat: number;
	lng: number;
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function distanceBetween(p1: Point, p2: Point) {
	return turf.distance(
		turf.point([p1.lng, p1.lat]),
		turf.point([p2.lng, p2.lat]),
		{ units: "meters" },
	);
}
