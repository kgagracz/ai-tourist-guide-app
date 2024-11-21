import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { LoginUserBodyModel } from '../models/loginUserBodyModel'

export const loginUser = async (loginData: LoginUserBodyModel) => {
  const { password, email } = loginData
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password)
}
