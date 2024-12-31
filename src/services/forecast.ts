import httpRequest from "@/api/instance";
import { ForecastModel } from "@/types/forecast";
import { useQuery } from "@tanstack/react-query";

const KEY = import.meta.env.VITE_APP_WEATHER_KEY

async function getForecast(q: string = 'Damascus', days: number = 7) {
    const response = await httpRequest.get<ForecastModel>(`/forecast.json?key=${KEY}&q=${q}&days=${days}`);
    return response.data
}

export function useForecast(q?: string, days?: number) {
    return useQuery({
        queryKey: ['forecast', q, days],
        queryFn: () => getForecast(q, days),
        enabled: !!q && (q?.length > 3),
    })
}
