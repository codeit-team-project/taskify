export interface DashBoardValueType {
  title: string
  color: string
}

export interface DashBoardType {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId: number
}

export interface DashBoardListType {
  cursorId: number
  totalCount: number
  dashboards: DashBoardType[]
}
