/*로그인, 회원가입 등 유저 인증에 쓰일 types */

import { ChangeHandler, FieldErrors, UseFormWatch } from 'react-hook-form'

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

// mypage 페이지 프로필 input 종류 타입
export interface ProfileInputsType {
  nickname: string
  image: FileList
}

// mypage 페이지 프로필 input 종류 타입
export interface PasswordModifierInputsType {
  currentPassword: string
  newPassword: string
  newPasswordRepeat: string
}

// sign input 컴포넌트 props
export interface SignInputProps {
  placeholder: string
  labelName: string
  onChange: ChangeHandler
  onBlur: ChangeHandler
  name?: string
  disable?: boolean
  hasError: {} | FieldErrors<SignInInputsType | SignUpInputsType>
}

// profile input 컴포넌트 props
export interface ProfileInputProps {
  onChange: ChangeHandler
  watch: UseFormWatch<any>
  savedImg: string | null | undefined
  name?: string
  hasError?: {} | FieldErrors<ProfileInputsType>
}

// profile input request 타입
export interface ProfileReqType {
  nickname: string
  profileImageUrl: string
}
