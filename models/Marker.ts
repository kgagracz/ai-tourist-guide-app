import { LatLng } from 'react-native-maps/lib/sharedTypes'

export type Marker = {
    coordinate: LatLng,
    title: string,
    description?: string,
    attractionId?: number
}
