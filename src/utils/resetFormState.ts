import { FormContextProps } from '@/context/formContext'

export interface FormType {
  assigneeUserId: number
  assigneeUserName: string
  profileImage: string
  title: string
  description: string
  dueDate: any
  tags: any[]
  imageUrl: string | File
  preview: string
}

export const resetFormStatus = (obj: FormContextProps) => {
  for (const key of Object.keys(obj)) {
    switch (key) {
      case 'columnId':
        obj[key] = 0
        break
      case 'columnName':
        obj[key] = ''
        break
      case 'assigneeUserId':
        obj[key] = 0
        break
      case 'assigneeUserName':
        obj[key] = ''
        break
      case 'profileImage':
        obj[key] = ''
      case 'title':
        obj[key] = ''
        break
      case 'description':
        obj[key] = ''
        break
      case 'dueDate':
        obj[key] = null
        break
      case 'tags':
        obj[key] = []
        break
      case 'imageUrl':
        obj[key] = ''
      case 'preview':
        obj[key] = ''
        break
    }
  }
}
