import { FormContextProps } from '@/context/formContext'

export const createModalInputValidation = (obj: FormContextProps) => {
  const result =
    Object.keys(obj)
      .map((key) => {
        if (key === 'assigneeUserId' && obj[key] !== 0) return true
        if (key === 'assigneeUserName' && obj[key] !== '') return true
        if (key === 'title' && obj[key] !== '') return true
        if (key === 'description' && obj[key] !== '') return true
        if (key === 'dueDate' && obj[key] !== null) return true

        if (key === 'tags' && obj[key].length !== 0) return true
        if (key === 'imageUrl' && obj[key] !== '') return true
      })
      .filter((boolean) => boolean).length === 7
  return result
}

export const editModalInputValidation = (obj: FormContextProps) => {
  const result =
    Object.keys(obj)
      .map((key) => {
        if (key === 'columnId' && obj[key] !== 0) return true
        if (key === 'columnName' && obj[key] !== '') return true
        if (key === 'assigneeUserId' && obj[key] !== 0) return true
        if (key === 'assigneeUserName' && obj[key] !== '') return true
        if (key === 'title' && obj[key] !== '') return true
        if (key === 'description' && obj[key] !== '') return true
        if (key === 'dueDate' && obj[key] !== null) return true
        if (key === 'tags' && obj[key].length !== 0) return true
        if (key === 'imageUrl' && obj[key] !== '') return true
      })
      .filter((boolean) => boolean).length === 9
  return result
}
