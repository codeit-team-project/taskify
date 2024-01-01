import { createContext, useState } from 'react'

export interface FormContextProps {
  columnId: number
  columnName: string
  assigneeUserId: number
  assigneeUserName: string
  profileImage: string
  title: string
  description: string
  dueDate: Date | null
  tags: string[]
  imageUrl: string | File
  preview: string
  setColumnId: Function
  setColumnName: Function
  setAssigneeUserId: Function
  setAssigneeUserName: Function
  setProfileImage: Function
  setTitle: Function
  setDescription: Function
  setDueDate: Function
  setTags: Function
  setImageUrl: Function
  setPreview: Function
}

export const FormContext = createContext<FormContextProps>({
  columnId: 0,
  columnName: '',
  assigneeUserId: 0,
  assigneeUserName: '',
  profileImage: '',
  title: '',
  description: '',
  dueDate: null,
  tags: [],
  imageUrl: '',
  preview: '',
  setColumnId: () => {},
  setColumnName: () => {},
  setAssigneeUserId: () => {},
  setAssigneeUserName: () => {},
  setProfileImage: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setDueDate: () => {},
  setTags: () => {},
  setImageUrl: () => {},
  setPreview: () => {},
})

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [columnId, setColumnId] = useState(0)
  const [columnName, setColumnName] = useState('')
  const [assigneeUserId, setAssigneeUserId] = useState(0)
  const [assigneeUserName, setAssigneeUserName] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [tags, setTags] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState('')
  return (
    <FormContext.Provider
      value={{
        columnId,
        columnName,
        assigneeUserId,
        assigneeUserName,
        profileImage,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
        preview,
        setColumnId,
        setColumnName,
        setAssigneeUserId,
        setAssigneeUserName,
        setProfileImage,
        setTitle,
        setDescription,
        setDueDate,
        setTags,
        setImageUrl,
        setPreview,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
