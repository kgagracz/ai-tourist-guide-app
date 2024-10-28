import axios from 'axios'
import { OVERPASS_API_URL } from '../../env.development'

// eslint-disable-next-line max-len
function capitalizeFirstLetterOfEachWord(input: string): string {
  return input
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const prepareDifferentLetterCaseExamples = (name: string) => {
  const lowerCase = name.toLowerCase()
  const upperCase = name.toUpperCase()
  const capitalized = capitalizeFirstLetterOfEachWord(name)
  return [lowerCase, upperCase, capitalized].join('|')
}
const prepareOverpassQuery = (name: string) => `[out:json][timeout:26];nwr["tourism"="attraction"]["name"~"${prepareDifferentLetterCaseExamples(name)}"];out geom;`

export const getAttractionsByName = async (name: string, signal: AbortSignal) => {
  const qry = encodeURIComponent(prepareOverpassQuery(name))
  const overpassApiUrl = `${OVERPASS_API_URL}/interpreter`
  const body = `data=${qry}`

  const res = await axios.post(overpassApiUrl, body, { signal })
  if (!res.data) {
    throw new Error('Nie udało się pobrać danych.')
  }
  return res
}
