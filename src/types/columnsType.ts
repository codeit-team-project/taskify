export interface ColumnValueType {
  title: string
  dashboardId: number
}

export interface ColumnType {
  id: number
  title: string
  teamId: string
  createdAt: string
  updatedAt: string
}

export interface ColumnsType {
  result: 'SUCCESS' // Enum Type
  data: ColumnType[]
}

export interface CardImageUploadValueType {
  imageUrl: string
}
