export interface ColumnValueType {
  title: string
  dashboardId: number
}
export interface ColumnsType {
  result: 'SUCCESS' // Enum Type
  data: ColumnType[]
}
export interface ColumnType {
  id: number
  title: string
  teamId: string
  createdAt: string
  updatedAt: string
}

export interface CardImageUploadValueType {
  imageUrl?: string
}
