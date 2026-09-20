import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Button,
    ScrollView,
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
            <View style={styles.centerContainer}>
                <Text style={styles.loadingText}>Chưa lấy được vị trí</Text>
                <Button title="Lấy vị trí" onPress={requestLocation} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>Đang lấy dữ liệu...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerTitle}>🌤️ Thời tiết</Text>

            {/* CARD LỚN Ở TRÊN (Thông tin chính) */}
            <View style={styles.topCard}>
                <Text style={styles.locationText}>
                    Lat: {location.latitude.toFixed(4)} | Lon: {location.longitude.toFixed(4)}
                </Text>
                <Text style={styles.mainTemp}>
                    {weatherData?.current?.temperature_2m}°C
                </Text>
                <Text style={styles.mainWind}>
                    💨 Gió: {weatherData?.current?.wind_speed_10m} km/h
                </Text>
            </View>

            {/* CÁC CARD NHỎ CHIA 2 CỘT */}
            <View style={styles.gridContainer}>
                {/* Card PM2.5 */}
                <View style={styles.gridCard}>
                    <Text style={styles.cardIcon}>🫁</Text>
                    <Text style={styles.cardTitle}>PM2.5</Text>
                    <Text style={styles.cardValue}>
                        {airQualityData?.current?.pm2_5}
                    </Text>
                </View>

                {/* Card Độ cao */}
                <View style={styles.gridCard}>
                    <Text style={styles.cardIcon}>⛰️</Text>
                    <Text style={styles.cardTitle}>Độ cao</Text>
                    <Text style={styles.cardValue}>
                        {elevationData?.elevation?.[0]} m
                    </Text>
                </View>

                {/* Card Lưu lượng sông */}
                <View style={styles.gridCard}>
                    <Text style={styles.cardIcon}>🌊</Text>
                    <Text style={styles.cardTitle}>Lưu lượng sông</Text>
                    <Text style={styles.cardValue}>
                        {floodData?.daily?.river_discharge?.[0]} m³/s
                    </Text>
                </View>

                {/* Card Sóng biển */}
                <View style={styles.gridCard}>
                    <Text style={styles.cardIcon}>🏄‍♂️</Text>
                    <Text style={styles.cardTitle}>Sóng biển</Text>
                    <Text style={styles.cardValue}>
                        {marineData?.hourly?.wave_height?.[0]} m
                    </Text>
                </View>

                {/* Card Lịch sử */}
                <View style={styles.gridCard}>
                    <Text style={styles.cardIcon}>📅</Text>
                    <Text style={styles.cardTitle}>Max Lịch sử</Text>
                    <Text style={styles.cardValue}>
                        {historicalData?.daily?.temperature_2m_max?.[0]}°C
                    </Text>
                </View>
            </View>

            {/* Nút cập nhật */}
            <View style={styles.buttonWrapper}>
                <Button title="Cập nhật vị trí" onPress={requestLocation} color="#4A90E2" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7FA', // Màu nền sáng
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#F5F7FA',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#333',
    },

    // Style cho Card lớn ở trên
    topCard: {
        backgroundColor: '#4A90E2', // Màu xanh tạo điểm nhấn
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        // Đổ bóng cho card
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6, // Đổ bóng trên Android
    },
    locationText: {
        color: '#E0F0FF',
        fontSize: 14,
        marginBottom: 8,
    },
    mainTemp: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    mainWind: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 8,
    },

    // Style cho Container chứa các Card nhỏ (Chia cột)
    gridContainer: {
        flexDirection: 'row', // Sắp xếp theo chiều ngang
        flexWrap: 'wrap',     // Tự động xuống dòng nếu hết chỗ
        justifyContent: 'space-between', // Đẩy 2 card ra 2 bên
    },

    // Style cho từng Card nhỏ
    gridCard: {
        backgroundColor: '#FFFFFF',
        width: '48%', // Chiếm 48% chiều ngang (chừa 4% khoảng trống giữa 2 card)
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        // Đổ bóng cho card
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginBottom: 4,
    },
    cardValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },

    buttonWrapper: {
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 8,
        overflow: 'hidden',
    }
});