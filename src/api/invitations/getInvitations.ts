import axiosInstance from '@/commons/lib/axiosInstance'
import { ReceivedInvitationsType } from '@/types/invitations'

export const getInvitations = async (title?: string, pageParam?: number | null) => {
  try {
    let query = ''
    if (pageParam) query += `&cursorId=${pageParam}`
    if (title) query += `&title=${title}`
    const response = await axiosInstance.get<ReceivedInvitationsType>(`/invitations?size=5${query}`)

    return response.data
  } catch (error) {
    throw error
  }
}
