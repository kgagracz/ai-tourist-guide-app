import AsyncStorage from '@react-native-community/async-storage'

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
