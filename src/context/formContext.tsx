import { createContext, useState } from 'react'

interface FormContextProps {
  manager: string
  title: string
  description: string
  dueDate: null | Date | undefined
  tags: string[]
  imageUrl: string
  setManager: Function
  setTitle: Function
  setDescription: Function
  setDueDate: Function
  setTags: Function
  setImageUrl: Function
}

export const FormContext = createContext<FormContextProps>({
  manager: '',
  title: '',
  description: '',
  dueDate: null,
  tags: [],
  imageUrl: '',
  setTitle: () => {},
  setManager: () => {},
  setDescription: () => {},
  setDueDate: () => {},
  setTags: () => {},
  setImageUrl: () => {},
})

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [manager, setManager] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [tags, setTags] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState('')
  return (
    <FormContext.Provider
      value={{
        manager,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
        setManager,
        setTitle,
        setDescription,
        setDueDate,
        setTags,
        setImageUrl,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
