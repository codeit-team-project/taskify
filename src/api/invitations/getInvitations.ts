import axiosInstance from '@/commons/lib/axiosInstance'
import { ReceivedInvitationsType } from '@/types/invitations'

export const getInvitations = async (title?: string) => {
  try {
    const query = title ? `size=10&title=${title}` : 'size=10'
    const response = await axiosInstance.get<ReceivedInvitationsType>(`/invitations?${query}`)

    return response.data
  } catch (error) {
    throw error
  }
}
