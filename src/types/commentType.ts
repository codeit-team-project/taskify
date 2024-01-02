export interface getCommentsType {
  comments: CommentType[]
  cursorId: any
}

export interface CommentType {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  cardId: number
  author: AuthorType
}

export interface AuthorType {
  id: number
  nickname: string
  profileImageUrl: string
}
