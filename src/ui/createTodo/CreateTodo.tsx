import React, { useContext } from 'react'
import styles from '@/ui/createTodo/CreateTodo.module.scss'
import Manager from '@/components/modalInput/Manager'
import Title from '@/components/modalInput/Title'
import DeadLine from '@/components/modalInput/DeadLine'
import ImageUpload from '@/components/modalInput/ImageUpload'
import ModalButton from '@/components/modalButton/ModalButton'
import DesCription from '@/components/modalInput/DesCription'
import { FormContext } from '@/context/formContext'
import axiosInstance from '@/utils/axiosinstance'
import { format } from 'date-fns'
import Tags from '@/components/modalInput/Tags'
import { createCard } from '@/api/cards'

interface CreateTodoInterface {
  onClose: () => void
}
export default function CreateTodo({ onClose }: CreateTodoInterface) {
  const obj = useContext(FormContext)

  const team = '1-2'
  const columnId = 91
  const handleCreateCard = async () => {
    const formData = new FormData()
    formData.append('image', obj.imageUrl)
    const response = await axiosInstance.post(`${team}/columns/${columnId}/card-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const dataObj = {
      assigneeUserId: 56,
      dashboardId: 27,
      columnId: columnId,
      title: obj.title,
      description: obj.description,
      dueDate: format(new Date(obj.dueDate), 'yyyy-MM-dd HH:mm'),
      tags: obj.tags,
      imageUrl: response.data.imageUrl,
    }

    await createCard(dataObj)
    // await axiosInstance.post(`${team}/cards`, dataObj)
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>할일생성</span>
      <Manager />
      <Title />
      <DesCription />
      <DeadLine />
      <Tags />
      <ImageUpload />
      <div className={styles.button}>
        <ModalButton color="white" onClick={onClose}>
          취소
        </ModalButton>
        <ModalButton color="purple" onClick={handleCreateCard}>
          생성
        </ModalButton>
      </div>
    </div>
  )
}
