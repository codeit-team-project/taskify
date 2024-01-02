import axiosInstance from '@/commons/lib/axiosInstance'
import { CardType } from '@/types/cardsType'

export interface CardValueType {
  assigneeUserId: number
  dashboardId: number
  columnId: number
  title: string
  description: string
  dueDate: string
  tags: string[]
  imageUrl: string
}

export const createCard = async ({
  assigneeUserId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: CardValueType) => {
  await axiosInstance.post<CardType>(`/cards`, {
    assigneeUserId,
    dashboardId,
    columnId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  })
}
