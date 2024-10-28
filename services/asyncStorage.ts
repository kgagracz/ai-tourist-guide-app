import AsyncStorage from '@react-native-community/async-storage'
import { VISITED_ATTRACTION_API_URL } from '../api/attractions/services/visitedAttractions.api'
import { SAVED_ATTRACTIONS_API_URL } from '../api/attractions/services/savedAttractions.api'
import savedAttractionsMock from '../mocks/savedAttractions.json'

export const initAsyncStorage = async () => {
  await AsyncStorage.clear()
  await AsyncStorage.setItem(VISITED_ATTRACTION_API_URL, '[]')
  await AsyncStorage.setItem(SAVED_ATTRACTIONS_API_URL, JSON.stringify(savedAttractionsMock))
}

export const getFromAsyncStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (error) {
    // Error saving data
  }
}

export const addItemToAsyncStorageArray = async (key: string, item: unknown) => {
  const existingValue = await AsyncStorage.getItem(key)
  if (!existingValue) { return }
  const existingArray = JSON.parse(existingValue)
  if (!Array.isArray(existingArray)) { return }
  existingArray.push(item)
  await AsyncStorage.setItem(key, JSON.stringify(existingArray))
}

export const mergeItemToAsyncStorage = async (key: string, value: unknown) => {
  await AsyncStorage.mergeItem(key, JSON.stringify(value))
}

export const saveToAsyncStorage = async (key: string, value: unknown) => {
  try {
    const stringValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, stringValue)
  } catch (error) {
    // Error saving data
  }
}

export const removeFromAsyncStorage = async (key: string) => AsyncStorage.removeItem(key)
