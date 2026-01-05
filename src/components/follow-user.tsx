import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
	position: {
		lat: number;
		lng: number;
	};
	isTracking: boolean;
};

export default function FollowUser({ position, isTracking }: Props) {
	const map = useMap();

	useEffect(() => {
		if (!isTracking) return;

		map.setView([position.lat, position.lng], map.getZoom(), {
			animate: true,
		});
	}, [isTracking, map, position]);

	return null;
}
