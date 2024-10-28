import { AxiosResponse } from 'axios'
import { Element } from '../models/Element'
import { Attraction } from '../../../models/Attraction'
import { OverpassResponse } from '../models/OverpassResponse'

type ElementWithLocation = Element & {lon: number, lat: number}
export const filterOverpassElements = (element: Element) => element.tags
    && (element.tags.name || element.tags.operator)
    && element.id
    && element.lat && element.lon

export const parseOverpassElementToAttraction = (element: ElementWithLocation): Attraction => ({
  id: element.id,
  name: element.tags.name,
  city: element.tags['addr:city'],
  location: {
    longitude: element.lon,
    latitude: element.lat,
  },
})

export const parseOverpassResponse = (
  response: AxiosResponse<OverpassResponse>,
): Attraction[] => (response.data.elements
  .filter(filterOverpassElements) as ElementWithLocation[])
  .map(parseOverpassElementToAttraction)
