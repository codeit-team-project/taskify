import { InvitationType } from './invitedDashBoardListType'

export interface InvitationsValue {
  email: string
}

export interface InvitationsAboutMeType {
  cursorId: number
  invitations: InvitationType[]
}

export interface InvitedAcceptedType {
  inviteAccepted: boolean
}
