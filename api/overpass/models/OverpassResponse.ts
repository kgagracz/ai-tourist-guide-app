import { Element } from './Element'

type Osm3s = {
    copyright: string
    timestamp_osm_base: string
}

export type OverpassResponse = {
    elements: Element[]
    generator: string
    osm3s: Osm3s
    version: number
}
