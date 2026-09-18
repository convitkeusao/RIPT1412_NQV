import { useLocation } from '../hooks/useLocation';

import {
    useGetForecastQuery,
    useGetAirQualityQuery,
    useGetElevationQuery,
    useGetFloodQuery,
    useGetHistoricalQuery,
    useGetMarineQuery,
} from '../services/weatherApi';

export function useWeatherScreen() {
    const {
        location,
        requestLocation,
    } = useLocation();

    const skip = !location;

    const forecast = useGetForecastQuery(
        {
            lat: location?.latitude,
            lon: location?.longitude,
        },
        { skip },
    );

    const airQuality = useGetAirQualityQuery(
        {
            lat: location?.latitude,
            lon: location?.longitude,
        },
        { skip },
    );

    const elevation = useGetElevationQuery(
        {
            lat: location?.latitude,
            lon: location?.longitude,
        },
        { skip },
    );

    const flood = useGetFloodQuery(
        {
            lat: location?.latitude,
            lon: location?.longitude,
        },
        { skip },
    );

    const marine = useGetMarineQuery(
        {
            lat: location?.latitude,
            lon: location?.longitude,
        },
        { skip },
    );

    const historical = useGetHistoricalQuery(
        {
            lat: location?.latitude,
            lon: location?.longitude,
            start_date: '2026-09-01',
            end_date: '2026-09-18',
        },
        { skip },
    );

    const isLoading =
        forecast.isLoading ||
        airQuality.isLoading ||
        elevation.isLoading ||
        flood.isLoading ||
        marine.isLoading ||
        historical.isLoading;

    return {
        location,
        requestLocation,

        weatherData: forecast.data,
        airQualityData: airQuality.data,
        elevationData: elevation.data,
        floodData: flood.data,
        marineData: marine.data,
        historicalData: historical.data,

        isLoading,
    };
}