import { ToastAndroid } from 'react-native'

const useToast = () => {
  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  const showToastWithGravity = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    )
  }

  const showToastWithGravityAndOffset = (message: string) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    )
  }

  return {
    showToast,
    showToastWithGravity,
    showToastWithGravityAndOffset,
  }
}

export default useToast
