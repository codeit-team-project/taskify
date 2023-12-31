/*로그인, 회원가입 등 request 및 response data에 쓰일 types */

import { UserType } from './users'

// signin 페이지에서 request보낼 때 data 타입
// NOTE - SignInFormValueType에서 SignInDataType으로 이름 변경
export interface SignInDataType {
  email: string
  password: string
}

// signup 페이지에서 request보낼 때 data 타입
// NOTE - SignUpFormValueType에서 SignUpDataType으로 이름 변경
export interface SignUpDataType {
  email: string
  nickname: string
  password: string
}

//
export interface LoginType {
  user: UserType | null
  accessToken: string | null
}

export interface PasswordCheckVauleType {
  password: string
  newPassword: string
}
