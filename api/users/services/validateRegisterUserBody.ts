import { TFunction } from 'i18next'
import { RegisterUserBodyModel } from '../models/registerUserBodyModel'

type ValidationErrors = Record<keyof RegisterUserBodyModel, 'string'>

export interface ValidationResults {
    isValid: boolean,
    errors: ValidationErrors
}

export const validateRegisterUserBody = (userRegisterBody: RegisterUserBodyModel, t: TFunction): ValidationResults => {
  const { password, email } = userRegisterBody
  // @ts-ignore
  const errors: ValidationErrors = {}
  if (!password) {
    errors.password = t('PASSWORD_REQUIRED')
  }
  if (!email) {
    errors.email = t('EMAIL_REQUIRED')
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}
