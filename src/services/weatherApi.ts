import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
    reducerPath: 'weatherApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://',
    }),

    endpoints: builder => ({

        // Weather
        getForecast: builder.query({
            query: ({ lat, lon }) =>
                `api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`,
        }),

        // Historical
        getHistorical: builder.query({
            query: ({ lat, lon, start_date, end_date }) =>
                `api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start_date}&end_date=${end_date}&daily=temperature_2m_max&timezone=auto`,
        }),

        // Elevation
        getElevation: builder.query({
            query: ({ lat, lon }) =>
                `api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`,
        }),

        // Air Quality
        getAirQuality: builder.query({
            query: ({ lat, lon }) =>
                `air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm2_5,carbon_monoxide`,
        }),

        // Flood
        getFlood: builder.query({
            query: ({ lat, lon }) =>
                `flood-api.open-meteo.com/v1/flood?latitude=${lat}&longitude=${lon}&daily=river_discharge`,
        }),

        // Marine
        getMarine: builder.query({
            query: ({ lat, lon }) =>
                `marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction`,
        }),
    }),
});

export const {
    useGetForecastQuery,
    useGetHistoricalQuery,
    useGetElevationQuery,
    useGetAirQualityQuery,
    useGetFloodQuery,
    useGetMarineQuery,
} = weatherApi;