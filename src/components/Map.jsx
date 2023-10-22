import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPositon, setMapPosition] = useState([40, 0]);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer center={mapPositon} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPositon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
