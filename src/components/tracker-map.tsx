import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

interface Props {
	route: { lat: number; lng: number }[];
	isTracking?: boolean;
}

export default function TrackerMap({ route, isTracking = false }: Props) {
	const lastPoint = route[route.length - 1];

	const center = route.length
		? [lastPoint.lat, lastPoint.lng]
		: [28.6139, 77.209]; // fallback (India)

	return (
		<MapContainer
			center={Leaflet.latLng(center[0], center[1])}
			zoom={16}
			style={{ height: "100%", width: "100%" }}
		>
			<TileLayer
				attribution="© OpenStreetMap"
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{route.length > 0 && (
				<>
					<Polyline positions={route.map((p) => [p.lat, p.lng])} />
					<Marker position={[route[0].lat, route[0].lng]} />
					<Marker position={[lastPoint.lat, lastPoint.lng]} />
				</>
			)}
		</MapContainer>
	);
}
