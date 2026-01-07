import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

interface Props {
	route: { lat: number; lng: number }[];
}

export default function TrackerMap({ route }: Props) {
	const lastPoint = route[route.length - 1];

	return (
		<MapContainer
			className="w-full h-full"
			center={Leaflet.latLng(lastPoint.lat, lastPoint.lng)}
			zoom={16}
			zoomControl={false}
		>
			<TileLayer
				attribution="© OpenStreetMap"
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<Polyline positions={route.map((p) => [p.lat, p.lng])} />
			<Marker position={[route[0].lat, route[0].lng]} />
			<Marker position={[lastPoint.lat, lastPoint.lng]} />
		</MapContainer>
	);
}
