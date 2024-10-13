import {
  addItemToAsyncStorageArray,
  getFromAsyncStorage,
  mergeItemToAsyncStorage,
  saveToAsyncStorage,
} from './asyncStorage'

// todo - po dodaniu api zamienić async storage na axiosa
export const get = async (url: string) => getFromAsyncStorage(url)
export const post = async (url: string, content: unknown) => {
  const existingValue = await getFromAsyncStorage(url)
  if (!existingValue) {
    await saveToAsyncStorage(url, content)
    return
  }
  if (Array.isArray(JSON.parse(existingValue))) {
    await addItemToAsyncStorageArray(url, content)
    return
  }
  await mergeItemToAsyncStorage(url, content)
}

export const prepareQueryParamsFromObject = (object: Record<string, any>) => {
  const params = new URLSearchParams()
  // todo handle all value types
  Object.entries(object).map((entry) => params.append(...entry))
  return params
}
