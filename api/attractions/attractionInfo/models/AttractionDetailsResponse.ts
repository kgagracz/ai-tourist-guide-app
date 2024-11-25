import { ApiResponse } from '../../../models/ApiResponse'

export interface AttractionDetails {
    name: string,
    lat: number,
    lon: number,
    description: string,
    isSaved: boolean,
    isVisited: boolean,
    overpassId: number
    city: string
}

export type AttractionDetailsResponse = ApiResponse<AttractionDetails>
