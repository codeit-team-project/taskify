import { ChangeHandler, FieldErrors } from 'react-hook-form'
import { SignInFormValueType, SignUpFormValueType } from './auth'

export interface SignInputProps {
  placeholder: string
  labelName: string
  onChange: ChangeHandler
  onBlur: ChangeHandler
  name?: string
  check?: boolean
  setCheck?: (state: boolean) => void
  hasError: {} | FieldErrors<SignInFormValueType | SignUpFormValueType>
}
