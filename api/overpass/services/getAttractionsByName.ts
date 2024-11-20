import axios from 'axios'
import { GestureResponderEvent } from 'react-native'
import { OVERPASS_API_URL } from '../../../env.development.local'
import { prepareDifferentLetterCaseExamples } from '../../../services/stringUtils'
import { OverpassResponse } from '../models/OverpassResponse'
import { Attraction } from '../../../models/Attraction'
import { AttractionItemInList } from '../../../components/organisms/AttractionsList/AttractionListItem'
import { filterOverpassElements } from './utils'
import { Element } from '../models/Element'

// eslint-disable-next-line max-len
const prepareOverpassQuery = (name: string) => `[out:json][timeout:26];nwr["tourism"="attraction"]["name"~"${prepareDifferentLetterCaseExamples(name)}"];out geom;`

const parseOverpassElementToAttractionListItem = (
  element: Element,
  onAttractionPress: (e: GestureResponderEvent, attraction: Attraction) => void,
): AttractionItemInList => ({
  id: element.id,
  name: element.tags.name,
  city: element.tags['addr:city'],
  location: {
    longitude: element.lon,
    latitude: element.lat,
  },
  onPress: onAttractionPress,
}) as AttractionItemInList

export const parseResponseToAttractions = (
  response: OverpassResponse,
  onAttractionPress: (e: GestureResponderEvent, attraction: Attraction) => void,
) => response.elements
  .filter(filterOverpassElements)
  .map((element) => parseOverpassElementToAttractionListItem(element, onAttractionPress))

export const getAttractionsByName = async (name: string, signal: AbortSignal) => {
  const qry = encodeURIComponent(prepareOverpassQuery(name))
  const overpassApiUrl = `${OVERPASS_API_URL}/interpreter`
  const body = `data=${qry}`

  const res = await axios.post<OverpassResponse>(overpassApiUrl, body, { signal })
  if (!res.data) {
    throw new Error('Nie udało się pobrać danych.')
  }
  return res
}
