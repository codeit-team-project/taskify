/* 유저의 정보값에 쓰일 types */

export interface UserType {
  id: number
  email: string
  nickname: string
  profileImageUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface UserImageUploadValueType {
  profileImageUrl: FormData
}
