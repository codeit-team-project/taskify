// 정규식을 모아두는 파일

export const emailReg =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/

export const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/

export const nicknameReg = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/
