export interface Members {
  id: number
  userId: number
  email: string
  nickname: string
  profileImageUrl: string
  createdAt: string
  updatedAt: string
  isOwner: boolean
}

export interface DashBoardMembers {
  totalCount: number
  members: Members[]
}
