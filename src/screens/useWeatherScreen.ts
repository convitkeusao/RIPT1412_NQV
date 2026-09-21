import { useLocation } from '../hooks/useLocation';
import { useGetForecastQuery } from '../services/weatherApi';

export function useWeatherScreen() {
    const {
        location,
        requestLocation,
    } = useLocation();

    const skip = !location;

    const forecast = useGetForecastQuery(
        {
            lat: location?.latitude!,
            lon: location?.longitude!,
        },
        {
            skip,
        },
    );

    return {
        location,
        requestLocation,

        weatherData: forecast.data,

        isLoading: forecast.isLoading,
        error: forecast.error,
    };
}