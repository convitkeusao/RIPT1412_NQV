import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';

export function useLocation() {
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const requestLocation = async () => {
        if (Platform.OS === 'android') {
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
                return;
            }
        }

        Geolocation.getCurrentPosition(
            position => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => {
                console.log("Loi:", error);

            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            },
        );
    };

    return {
        location,
        requestLocation
    };
}

