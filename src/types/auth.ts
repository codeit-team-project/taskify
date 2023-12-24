// TODO - users.ts 파일과 중복되는 코드 삭제하고 SignUpTempValueType도 정리할 예정.

import { UserType } from './users'

export interface SignInFormValueType {
  email: string
  password: string
}

export interface SignUpTempValueType extends SignInFormValueType {
  nickname: string
  passwordRepeat: string
}

export interface LoginType {
  user: UserType | null
  accessToken: string | null
}

export interface PasswordCheckVauleType {
  password: string
  newPassword: string
}
