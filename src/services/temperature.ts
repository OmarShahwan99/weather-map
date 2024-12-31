import httpRequest from "@/api/instance";
import { useQuery } from "@tanstack/react-query";

async function getTemperatureData(bbox: string) {
    const response = await httpRequest.get(`https://api.openweathermap.org/data/2.5/box/city?bbox=${bbox},10&appid=f7d334bfd2c7c88bb197e2935fb7efb3&units=metric`);
    return response.data
}

export function useTemperatureData(bbox: string) {
    return useQuery({
        queryKey: ['temperature', bbox],
        queryFn: () => getTemperatureData(bbox)
    })
}