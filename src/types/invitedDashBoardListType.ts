export interface InvitationType {
  id: number
  inviterUserId: number
  teamId: string
  dashboard: {
    title: string
    id: number
  }
  invitee: {
    nickname: string
    id: number
    email: string
  }
  inviter: {
    nickname: string
    id: number
    email: string
  }
  inviteAccepted: boolean
  createdAt: string
  updatedAt: string
}

export interface InvitationsType {
  totalCount: number
  invitations: InvitationType[]
}
