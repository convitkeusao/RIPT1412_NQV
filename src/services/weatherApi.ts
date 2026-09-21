import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

type ForecastParams = {
    lat: number;
    lon: number;
};

export const weatherApi = createApi({
    reducerPath: 'weatherApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://',
    }),

    endpoints: builder => ({
        getForecast: builder.query<any, ForecastParams>({
            query: ({ lat, lon }) =>
                `api.open-meteo.com/v1/forecast` +
                `?latitude=${lat}` +
                `&longitude=${lon}` +
                `&current=` +
                `temperature_2m,` +
                `relative_humidity_2m,` +
                `apparent_temperature,` +
                `weather_code,` +
                `wind_speed_10m,` +
                `is_day` +
                `&hourly=` +
                `temperature_2m,` +
                `precipitation_probability,` +
                `weather_code` +
                `&daily=` +
                `weather_code,` +
                `temperature_2m_max,` +
                `temperature_2m_min,` +
                `precipitation_probability_max,` +
                `sunrise,` +
                `sunset` +
                `&timezone=auto` +
                `&forecast_days=7`,
        }),
    }),
});

export const {
    useGetForecastQuery,
} = weatherApi;