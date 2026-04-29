export interface LocationCoordinates {
    lat: number
    lng: number
}

export async function getCurrentLocation(): Promise<LocationCoordinates> {
    // Default location (you can change this to your preferred default)
    const defaultLocation: LocationCoordinates = {
        lat: 40.7128, // New York City
        lng: -74.006,
    }

    return new Promise((resolve) => {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            console.warn('Geolocation is not supported by this browser')
            resolve(defaultLocation)
            return
        }

        // Get current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            },
            (error) => {
                console.warn('Error getting location:', error.message)
                resolve(defaultLocation)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000, // 10 seconds
                maximumAge: 300000, // 5 minutes
            }
        )
    })
}

export async function getCurrentLocationWithDefault(
    defaultLat: number,
    defaultLng: number
): Promise<LocationCoordinates> {
    const customDefault: LocationCoordinates = {
        lat: defaultLat,
        lng: defaultLng,
    }

    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve(customDefault)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            },
            () => resolve(customDefault),
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        )
    })
}

export const getDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
): number => {
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
}

export const redirectToGoogleMapsDirection = (
    lat: number,
    lng: number,
    openExternal = true
) => {
    const url = constructGoogleMapsDirectionUrl(lat, lng)

    window.open(url, openExternal ? '_blank' : '_self')
}

export const redirectToGoogleMapsView = (
    lat: number,
    lng: number,
    openExternal = true
) => {
    const url = constructGoogleMapsViewUrl(lat, lng)

    window.open(url, openExternal ? '_blank' : '_self')
}

export const constructGoogleMapsDirectionUrl = (lat: number, lng: number) =>
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

export const constructGoogleMapsViewUrl = (lat: number, lng: number) =>
    `https://www.google.com/maps?q=${lat},${lng}`
