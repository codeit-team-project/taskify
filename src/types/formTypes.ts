/*로그인, 회원가입 등 유저 인증에 쓰일 types */

import { ChangeHandler, FieldErrors } from 'react-hook-form'

// signin 페이지 input 종류 타입
export interface SignInInputsType {
  email: string
  password: string
}

// signup 페이지 input 종류 타입
export interface SignUpInputsType extends SignInInputsType {
  nickname: string
  passwordRepeat: string
}

// sign input 컴포넌트 props
export interface SignInputProps {
  placeholder: string
  labelName: string
  onChange: ChangeHandler
  onBlur: ChangeHandler
  name?: string
  hasError: {} | FieldErrors<SignInInputsType | SignUpInputsType>
}
