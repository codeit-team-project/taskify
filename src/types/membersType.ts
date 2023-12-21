export interface getMembers {
  members: Member[]
  totalCount: number
}

export interface Member {
  id: number
  email: string
  nickname: string
  profileImageUrl: any
  createdAt: string
  updatedAt: string
  isOwner: boolean
  userId: number
}
