export interface CardType {
  id: number
  title: string
  description: string
  tags: [string]
  dueDate: string
  assignee: {
    profileImageUrl: string
    nickname: string
    id: number
  }
  imageUrl: string
  teamId: string
  columnId: number
  createdAt: string
  updatedAt: string
}

export interface CardsType {
  cursorId: number
  totalCount: number
  cards: CardType[] | []
}
