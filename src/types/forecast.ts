export interface ForecastModel {
    location: LocationModel;
    forecast: {
        forecastday: ForecastDayModel[]
    }
}

export interface LocationModel {
    country: string;
    lat: number;
    lon: number;
    name: string;
    region: string;
}

export interface ForecastDayModel {
    date: string;
    date_epoch: number;
    day: DayModel;
    hour: HourModel[]
}

export interface DayModel {
    avgtemp_c: number;
    avgtemp_f: number;
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: {
        code: number;
        icon: string;
        text: string
    }
}

export interface HourModel {
    time: string;
    condition: {
        code: number;
        icon: string;
        text: string;
    };
    heatindex_c: number;
    heatindex_f: number;
}