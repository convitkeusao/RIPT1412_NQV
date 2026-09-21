import React from 'react';

import {
    View,
    Text,
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
} from 'react-native';

import { useWeatherScreen } from './useWeatherScreen';

export default function WeatherScreen() {
    const {
        location,
        requestLocation,
        weatherData,
        isLoading,
    } = useWeatherScreen();

    // =========================
    // CHƯA CÓ VỊ TRÍ
    // =========================
    if (!location) {
        return (
            <View style={styles.centerContainer}>
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyIcon}>📍</Text>

                    <Text style={styles.emptyTitle}>
                        Chưa lấy được vị trí
                    </Text>

                    <Text style={styles.emptyDescription}>
                        Cho phép ứng dụng truy cập vị trí để xem
                        thông tin thời tiết hiện tại.
                    </Text>

                    <Pressable
                        style={styles.primaryButton}
                        onPress={requestLocation}
                    >
                        <Text style={styles.primaryButtonText}>
                            Lấy vị trí
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    // =========================
    // LOADING
    // =========================
    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator
                    size="large"
                    color="#3B82F6"
                />

                <Text style={styles.loadingText}>
                    Đang lấy dữ liệu thời tiết...
                </Text>
            </View>
        );
    }

    const current = weatherData?.current;
    const hourly = weatherData?.hourly;
    const daily = weatherData?.daily;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerSmall}>
                        THỜI TIẾT HIỆN TẠI
                    </Text>

                    <Text style={styles.headerTitle}>
                        Weather
                    </Text>
                </View>

                <Pressable
                    style={styles.refreshCircle}
                    onPress={requestLocation}
                >
                    <Text style={styles.refreshIcon}>
                        ↻
                    </Text>
                </Pressable>
            </View>

            {/* ========================= */}
            {/* CARD THỜI TIẾT HIỆN TẠI */}
            {/* ========================= */}

            <View style={styles.weatherCard}>
                <View style={styles.weatherTop}>
                    <View>
                        <Text style={styles.locationLabel}>
                            Vị trí hiện tại
                        </Text>

                        <Text style={styles.locationText}>
                            GPS Location
                        </Text>
                    </View>

                    <View style={styles.liveBadge}>
                        <Text style={styles.liveText}>
                            LIVE
                        </Text>
                    </View>
                </View>

                {/* Nhiệt độ */}
                <View style={styles.temperatureContainer}>
                    <View>
                        <Text style={styles.temperature}>
                            {current?.temperature_2m}°
                        </Text>

                        <Text style={styles.celsiusText}>
                            Celsius
                        </Text>
                    </View>

                    <View style={styles.weatherIconContainer}>
                        <Text style={styles.weatherIcon}>
                            🌤️
                        </Text>

                        <Text style={styles.weatherStatus}>
                            Thời tiết
                        </Text>
                    </View>
                </View>

                {/* ========================= */}
                {/* 3 THÔNG SỐ */}
                {/* ========================= */}

                <View style={styles.statsContainer}>

                    {/* Độ ẩm */}
                    <View style={styles.statItem}>
                        <Text style={styles.statIcon}>
                            💧
                        </Text>

                        <Text style={styles.statLabel}>
                            Độ ẩm
                        </Text>

                        <Text style={styles.statValue}>
                            {current?.relative_humidity_2m}%
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Gió */}
                    <View style={styles.statItem}>
                        <Text style={styles.statIcon}>
                            💨
                        </Text>

                        <Text style={styles.statLabel}>
                            Gió
                        </Text>

                        <Text style={styles.statValue}>
                            {current?.wind_speed_10m}
                        </Text>

                        <Text style={styles.statUnit}>
                            km/h
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Weather code */}
                    <View style={styles.statItem}>
                        <Text style={styles.statIcon}>
                            🌡️
                        </Text>

                        <Text style={styles.statLabel}>
                            Weather
                        </Text>

                        <Text style={styles.statValue}>
                            {current?.weather_code}
                        </Text>
                    </View>

                </View>
            </View>

            {/* ========================= */}
            {/* THEO GIỜ */}
            {/* ========================= */}

            <View style={styles.section}>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Theo giờ
                    </Text>

                    <Text style={styles.sectionLink}>
                        6 giờ tới
                    </Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {hourly?.time?.slice(0, 6).map(
                        (time: string, index: number) => (
                            <View
                                key={time}
                                style={styles.hourCard}
                            >
                                <Text style={styles.hourTime}>
                                    {time.slice(11, 16)}
                                </Text>

                                <Text style={styles.hourIcon}>
                                    {index === 0
                                        ? '🌤️'
                                        : '☀️'}
                                </Text>

                                <Text style={styles.hourTemperature}>
                                    {hourly.temperature_2m[index]}°
                                </Text>
                            </View>
                        ),
                    )}
                </ScrollView>
            </View>

            {/* ========================= */}
            {/* GPS */}
            {/* ========================= */}

            <View style={styles.card}>

                <View style={styles.cardHeader}>

                    <View style={styles.cardIcon}>
                        <Text>📍</Text>
                    </View>

                    <View>
                        <Text style={styles.cardTitle}>
                            Vị trí GPS
                        </Text>

                        <Text style={styles.cardSubtitle}>
                            Tọa độ hiện tại của thiết bị
                        </Text>
                    </View>

                </View>

                <View style={styles.coordinateRow}>

                    <View style={styles.coordinateBox}>
                        <Text style={styles.coordinateLabel}>
                            Latitude
                        </Text>

                        <Text style={styles.coordinateValue}>
                            {location.latitude.toFixed(4)}
                        </Text>
                    </View>

                    <View style={styles.coordinateBox}>
                        <Text style={styles.coordinateLabel}>
                            Longitude
                        </Text>

                        <Text style={styles.coordinateValue}>
                            {location.longitude.toFixed(4)}
                        </Text>
                    </View>

                </View>
            </View>

            {/* ========================= */}
            {/* DỰ BÁO 7 NGÀY */}
            {/* ========================= */}

            <View style={styles.section}>

                <Text style={styles.sectionTitle}>
                    Dự báo 7 ngày
                </Text>

                <View style={styles.dailyCard}>

                    {daily?.time?.map(
                        (date: string, index: number) => (
                            <View
                                key={date}
                                style={[
                                    styles.dailyItem,
                                    index === daily.time.length - 1 &&
                                    styles.lastDailyItem,
                                ]}
                            >

                                <View style={styles.dailyDate}>
                                    <Text style={styles.dailyDateText}>
                                        {date}
                                    </Text>

                                    <Text style={styles.dailyDescription}>
                                        Dự báo thời tiết
                                    </Text>
                                </View>

                                <Text style={styles.dailyIcon}>
                                    {index % 2 === 0
                                        ? '☀️'
                                        : '🌤️'}
                                </Text>

                                <View style={styles.dailyTemperature}>
                                    <Text style={styles.minTemperature}>
                                        {daily.temperature_2m_min[index]}°
                                    </Text>

                                    <Text style={styles.slash}>
                                        /
                                    </Text>

                                    <Text style={styles.maxTemperature}>
                                        {daily.temperature_2m_max[index]}°
                                    </Text>
                                </View>

                            </View>
                        ),
                    )}

                </View>
            </View>

            {/* ========================= */}
            {/* BUTTON */}
            {/* ========================= */}

            <Pressable
                style={styles.updateButton}
                onPress={requestLocation}
            >
                <Text style={styles.updateButtonText}>
                    ↻  Cập nhật vị trí
                </Text>
            </Pressable>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    // =========================
    // CONTAINER
    // =========================

    container: {
        flex: 1,
        backgroundColor: '#F4F6F8',
    },

    content: {
        paddingBottom: 40,
    },

    centerContainer: {
        flex: 1,
        backgroundColor: '#F4F6F8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    // =========================
    // EMPTY
    // =========================

    emptyCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 28,
        alignItems: 'center',
    },

    emptyIcon: {
        fontSize: 48,
    },

    emptyTitle: {
        marginTop: 16,
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },

    emptyDescription: {
        marginTop: 8,
        fontSize: 15,
        lineHeight: 22,
        color: '#6B7280',
        textAlign: 'center',
    },

    primaryButton: {
        width: '100%',
        marginTop: 24,
        backgroundColor: '#3B82F6',
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: 'center',
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },

    // =========================
    // LOADING
    // =========================

    loadingText: {
        marginTop: 16,
        fontSize: 15,
        color: '#6B7280',
    },

    // =========================
    // HEADER
    // =========================

    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 55,
        paddingBottom: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerSmall: {
        fontSize: 12,
        fontWeight: '600',
        color: '#94A3B8',
        letterSpacing: 1,
    },

    headerTitle: {
        marginTop: 4,
        fontSize: 26,
        fontWeight: '700',
        color: '#111827',
    },

    refreshCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    refreshIcon: {
        fontSize: 24,
        color: '#3B82F6',
    },

    // =========================
    // WEATHER CARD
    // =========================

    weatherCard: {
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: '#3B82F6',
        borderRadius: 28,
        overflow: 'hidden',
    },

    weatherTop: {
        padding: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    locationLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    locationText: {
        marginTop: 4,
        fontSize: 12,
        color: '#DBEAFE',
    },

    liveBadge: {
        backgroundColor: '#DBEAFE',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
    },

    liveText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#2563EB',
    },

    // =========================
    // TEMPERATURE
    // =========================

    temperatureContainer: {
        paddingHorizontal: 22,
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    temperature: {
        fontSize: 64,
        fontWeight: '300',
        color: '#FFFFFF',
    },

    celsiusText: {
        marginTop: -5,
        fontSize: 14,
        color: '#DBEAFE',
    },

    weatherIconContainer: {
        alignItems: 'center',
    },

    weatherIcon: {
        fontSize: 58,
    },

    weatherStatus: {
        marginTop: 5,
        fontSize: 13,
        color: '#DBEAFE',
    },

    // =========================
    // STATS
    // =========================

    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#2563EB',
        paddingVertical: 18,
        paddingHorizontal: 8,
    },

    statItem: {
        flex: 1,
        alignItems: 'center',
    },

    statIcon: {
        fontSize: 21,
    },

    statLabel: {
        marginTop: 5,
        fontSize: 11,
        color: '#BFDBFE',
    },

    statValue: {
        marginTop: 3,
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    statUnit: {
        fontSize: 10,
        color: '#BFDBFE',
    },

    divider: {
        width: 1,
        backgroundColor: '#60A5FA',
    },

    // =========================
    // SECTION
    // =========================

    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },

    sectionHeader: {
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 12,
    },

    sectionLink: {
        fontSize: 13,
        fontWeight: '600',
        color: '#3B82F6',
    },

    // =========================
    // HOURLY
    // =========================

    hourCard: {
        width: 86,
        marginRight: 10,
        paddingVertical: 15,
        paddingHorizontal: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    hourTime: {
        fontSize: 12,
        color: '#94A3B8',
    },

    hourIcon: {
        marginVertical: 12,
        fontSize: 30,
    },

    hourTemperature: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },

    // =========================
    // GENERAL CARD
    // =========================

    card: {
        marginHorizontal: 16,
        marginTop: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardTitle: {
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    cardSubtitle: {
        marginLeft: 12,
        marginTop: 3,
        fontSize: 12,
        color: '#94A3B8',
    },

    // =========================
    // GPS
    // =========================

    coordinateRow: {
        marginTop: 16,
        flexDirection: 'row',
        gap: 10,
    },

    coordinateBox: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        borderRadius: 14,
        padding: 12,
    },

    coordinateLabel: {
        fontSize: 11,
        color: '#94A3B8',
    },

    coordinateValue: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
    },

    // =========================
    // DAILY
    // =========================

    dailyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
    },

    dailyItem: {
        minHeight: 70,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },

    lastDailyItem: {
        borderBottomWidth: 0,
    },

    dailyDate: {
        flex: 1,
    },

    dailyDateText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },

    dailyDescription: {
        marginTop: 3,
        fontSize: 11,
        color: '#94A3B8',
    },

    dailyIcon: {
        marginRight: 16,
        fontSize: 24,
    },

    dailyTemperature: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    minTemperature: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },

    slash: {
        marginHorizontal: 5,
        color: '#CBD5E1',
    },

    maxTemperature: {
        fontSize: 14,
        fontWeight: '700',
        color: '#3B82F6',
    },

    // =========================
    // UPDATE BUTTON
    // =========================

    updateButton: {
        marginHorizontal: 16,
        marginTop: 24,
        backgroundColor: '#111827',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },

    updateButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
