type Location = {
    longitude: number,
    latitude: number
}

export type Attraction = {
    id: number,
    name: string,
    city: string,
    location: Location
}
