import { MapContainer, TileLayer, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { TemperatureOverlay } from './temperature-overlay';


const ChangeMapCenter = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    map.setView(position);
    return null;
};

const MapComponent = ({ position }: { position: [number, number] }) => {
    if (!position) return <p>Loading Map...</p>;

    return (
        <div className="h-full w-full rounded-lg shadow-lg overflow-hidden">
            <MapContainer
                center={position}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
            >
                <ChangeMapCenter position={position} />
                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="Temperature">
                        <TileLayer
                            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=85716d70713b33bf033f8a37df623121`}
                            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Clear Map" checked="Clear Map">
                        <TileLayer
                            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
                <TemperatureOverlay />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
