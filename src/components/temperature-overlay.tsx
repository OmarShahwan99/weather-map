import { useEffect, useState } from 'react';
import { useTemperatureData } from '@/services/temperature';
import { Circle, Popup, useMap } from 'react-leaflet';

export const TemperatureOverlay = () => {
    const map = useMap();
    const [bbox, setBbox] = useState<string>('');

    const updateBbox = () => {
        const bounds = map.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        const newBbox = `${southWest.lng},${southWest.lat},${northEast.lng},${northEast.lat}`;
        setBbox(newBbox);
    };

    useEffect(() => {
        updateBbox();
        map.on('moveend', updateBbox);

        return () => {
            map.off('moveend', updateBbox);
        };
    }, [map]);

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
