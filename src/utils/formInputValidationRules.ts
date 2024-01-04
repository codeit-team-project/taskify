import { emailReg, nicknameReg, passwordReg } from './regExpressions'

export const emailValidationRules = {
  required: '이메일은 필수 입력입니다.',
  pattern: {
    value: emailReg,
    message: '이메일 형식으로 작성해 주세요.',
  },
}

export const passwordValidationRules = {
  required: '비밀번호는 필수 입력입니다.',
  minLength: {
    value: 8,
    message: '8자리 이상 입력해 주세요.',
  },
  pattern: {
    value: passwordReg,
    message: '비밀번호는 영어 대, 소문자와 숫자가 각각 1개 이상 포함되게 해주세요.',
  },
}

export const noRequiredNicknameValidationRules = {
  maxLength: {
    value: 10,
    message: '열 자 이하로 작성해 주세요.',
  },
  pattern: {
    value: nicknameReg,
    message: '닉네임에는 공백이나 특수문자가 들어갈 수 없어요.',
  },
}

export const nicknameValidationRules = {
  required: '닉네임은 필수 입력입니다.',
  ...noRequiredNicknameValidationRules,
}

export const imgFileValidationRules = {}
