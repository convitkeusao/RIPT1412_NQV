import React from 'react';

import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Button,
} from 'react-native';

import { useWeatherScreen } from './useWeatherScreen';

export default function WeatherScreen() {
    const {
        location,
        requestLocation,

        weatherData,
        airQualityData,
        elevationData,
        floodData,
        marineData,
        historicalData,

        isLoading,
    } = useWeatherScreen();

    if (!location) {
        return (
            <View style={styles.container}>
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
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Đang lấy dữ liệu...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                🌤️ Thời tiết
            </Text>

            <Text>
                Latitude: {location.latitude}
            </Text>

            <Text>
                Longitude: {location.longitude}
            </Text>

            <Text>
                🌡️ Nhiệt độ:{' '}
                {weatherData?.current?.temperature_2m}°C
            </Text>

            <Text>
                💨 Gió:{' '}
                {weatherData?.current?.wind_speed_10m} km/h
            </Text>

            <Text>
                🫁 PM2.5:{' '}
                {airQualityData?.current?.pm2_5}
            </Text>

            <Text>
                ⛰️ Độ cao:{' '}
                {elevationData?.elevation?.[0]} m
            </Text>

            <Text>
                🌊 River discharge:{' '}
                {floodData?.daily?.river_discharge?.[0]} m³/s
            </Text>

            <Text>
                🌊 Wave height:{' '}
                {marineData?.hourly?.wave_height?.[0]} m
            </Text>

            <Text>
                📅 Nhiệt độ cao nhất lịch sử:{' '}
                {historicalData?.daily?.temperature_2m_max?.[0]}°C
            </Text>

            <Button
                title="Lấy lại vị trí"
                onPress={requestLocation}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});