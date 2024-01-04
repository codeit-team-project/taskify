import { InvitationType } from './invitedDashBoardListType'

export interface InvitationsValue {
  email: string
}

export interface ReceivedInvitationsType {
  cursorId: any
  invitations: InvitationType[] | []
}

export type PutInvitationType = {
  id: number
  inviteAccepted: boolean
}
