export interface SignUpFormValueType {
  email: string
  nickname: string
  password: string
}

export interface UserType {
  id: number
  email: string
  nickname: string
  profileImageUrl?: string | null
  createdAt: string
  updatedAt: string
}

export interface UserImageUploadValueType {
  profileImageUrl: string
}
