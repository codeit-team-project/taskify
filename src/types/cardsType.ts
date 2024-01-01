export interface getCardsType {
  cards: CardType[]
  totalCount: number
  cursorId: number
}
export interface CardType {
  id: number
  title: string
  description: string
  tags: string[]
  dueDate: string
  assignee: AssigneeType
  imageUrl: string
  teamId: string
  dashboardId: number
  columnId: number
  createdAt: string
  updatedAt: string
}

export interface AssigneeType {
  id: number
  nickname: string
  profileImageUrl: string
}
