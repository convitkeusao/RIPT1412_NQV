import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Button,
    ScrollView,
} from 'react-native';

import { useWeatherScreen } from './useWeatherScreen';

export default function WeatherScreen() {
    const {
        location,
        requestLocation,
        weatherData,
        isLoading,
    } = useWeatherScreen();

    if (!location) {
        return (
            <View>
                <Text>Chưa lấy được vị trí</Text>
                <Button
                    title="Lấy vị trí"
                    onPress={requestLocation}
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator />
                <Text>Đang lấy dữ liệu...</Text>
            </View>
        );
    }

    const current = weatherData?.current;
    const hourly = weatherData?.hourly;
    const daily = weatherData?.daily;

    return (
        <ScrollView>
            <Text>🌤️ Thời tiết</Text>

            <Text>
                Vị trí: {location.latitude}, {location.longitude}
            </Text>

            <Text>----- Hiện tại -----</Text>

            <Text>
                Nhiệt độ: {current?.temperature_2m}°C
            </Text>

            <Text>
                Độ ẩm: {current?.relative_humidity_2m}%
            </Text>

            <Text>
                Gió: {current?.wind_speed_10m} km/h
            </Text>

            <Text>
                Weather code: {current?.weather_code}
            </Text>

            <Text>----- Theo giờ -----</Text>

            {hourly?.time?.slice(0, 6).map(
                (time: string, index: number) => (
                    <Text key={time}>
                        {time}: {hourly.temperature_2m[index]}°C
                    </Text>
                )
            )}

            <Text>----- Theo ngày -----</Text>

            {daily?.time?.map(
                (date: string, index: number) => (
                    <Text key={date}>
                        {date}: {daily.temperature_2m_min[index]}°
                        {' - '}
                        {daily.temperature_2m_max[index]}°C
                    </Text>
                )
            )}

            <Button
                title="Cập nhật vị trí"
                onPress={requestLocation}
            />
        </ScrollView>
    );
}