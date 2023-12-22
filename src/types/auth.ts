import { UserType } from './users'

export interface SignInFormValueType {
  email: string
  password: string
}

export interface SignUpFormValueType extends SignInFormValueType {
  nickname: string
  passwordRepeat: string
}

export interface LoginType {
  user: UserType
  accessToken: string
}

export interface PasswordCheckVauleType {
  password: string
  newPassword: string
}
