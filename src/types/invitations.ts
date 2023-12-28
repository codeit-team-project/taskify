import { InvitationType } from './invitedDashBoardListType'

export interface InvitationsValue {
  email: string
}

export interface InvitedAcceptedType {
  inviteAccepted: boolean
}

export interface ReceivedInvitationsType {
  cursorId: number
  invitations: InvitationType[] | []
}

export type PutInvitationType = {
  id: number
  data: InvitedAcceptedType
}
