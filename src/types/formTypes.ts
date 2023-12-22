import { ChangeHandler, FieldErrors } from 'react-hook-form'

export interface SigninFormValueType {
  email: string
  password: string
}

export interface SignupFormValueType extends SigninFormValueType {
  passwordRepeat: string
}

export interface SignInputProps {
  id: string
  placeholder: string
  labelName: string
  onChange?: ChangeHandler
  onBlur?: ChangeHandler
  name?: string
  hasError?: {} | FieldErrors<SigninFormValueType>
}
