type Location = {
    attitude: number,
    latitude: number
}

export type SavedAttraction = {
    id: number,
    name: string,
    city: string,
    location: Location
}
