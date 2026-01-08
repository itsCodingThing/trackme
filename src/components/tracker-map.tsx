import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";

interface Props {
	coords: { lat: number; lng: number }[];
}

export default function TrackerMap({ coords }: Props) {
	const lastCoords = coords[coords.length - 1];

	return (
		<MapContainer
			className="w-full h-full"
			center={Leaflet.latLng(lastCoords.lat, lastCoords.lng)}
			zoom={16}
			zoomControl={false}
		>
			<TileLayer
				attribution="© OpenStreetMap"
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<Polyline positions={coords.map((p) => [p.lat, p.lng])} />
			<Marker position={[coords[0].lat, coords[0].lng]} />
			<Marker position={[lastCoords.lat, lastCoords.lng]} />
		</MapContainer>
	);
}
