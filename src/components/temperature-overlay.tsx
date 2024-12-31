import { useTemperatureData } from '@/services/temperature';
import { Circle, Popup, useMap } from 'react-leaflet';


export const TemperatureOverlay = () => {
    const map = useMap();

    const bounds = map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    const bbox = `${southWest.lng},${southWest.lat},${northEast.lng},${northEast.lat}`;

    const { data } = useTemperatureData(bbox);


    return (
        <>
            {data?.list?.map((point: any) => {
                let color;
                if (point.main.temp < 0) {
                    color = 'blue';
                } else if (point.main.temp < 15) {
                    color = 'lightblue';
                } else if (point.main.temp < 25) {
                    color = 'yellow';
                } else {
                    color = 'red';
                }

                return (
                    <Circle
                        key={point.id}
                        center={[point.coord.Lat, point.coord.Lon]}
                        radius={10000}
                        pathOptions={{ color }}
                    >
                        <Popup>
                            {point.name}: {point.main.temp}°C
                        </Popup>
                    </Circle>
                );
            })}
        </>
    );
};
