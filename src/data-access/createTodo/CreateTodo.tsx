import React, { useContext } from 'react'
import styles from './CreateTodo.module.scss'
import Manager from '@/components/modalInput/Manager'
import Title from '@/components/modalInput/Title'
import DeadLine from '@/components/modalInput/DeadLine'
import ImageUpload from '@/components/modalInput/ImageUpload'
import ModalButton from '@/components/modalButton/ModalButton'
import DesCription from '@/components/modalInput/DesCription'
import { FormContext } from '@/context/formContext'
import { format } from 'date-fns'
import Tags from '@/components/modalInput/Tags'
import { getDashBoardMembers } from '@/api/members/getMembers'
import { useQuery, useMutation } from '@tanstack/react-query'
import {
  CreateColumnImageUploadType,
  createColumnImageUpload,
} from '@/api/columns/createColumnImageUpload'
import { CardValueType, createCard } from '@/api/cards/createCard'
import { resetFormStatus } from '@/utils/resetFormState'
import { createModalInputValidation } from '@/utils/modalInputValidation'

interface CreateTodoInterface {
  columnId: number
  dashboardId: number
  onClose: () => void
  refetchFunc: (columnId: number) => void
}
export default function CreateTodo({
  refetchFunc,
  onClose,
  dashboardId,
  columnId,
}: CreateTodoInterface) {
  const obj = useContext(FormContext)
  const { data, isSuccess } = useQuery({
    queryKey: ['getDashBaordMembers'],
    queryFn: () => getDashBoardMembers(dashboardId),
  })

  const createImageMutation = useMutation({
    mutationFn: ({ columnId, data }: CreateColumnImageUploadType) =>
      createColumnImageUpload({ columnId, data }),
  })

  const createCardMutation = useMutation({
    mutationFn: (data: CardValueType) => createCard(data),
    onSuccess(_, variable) {
      refetchFunc(variable.columnId)

      resetFormStatus(obj)
      onClose()
    },
  })

  if (isSuccess) {
    const managerUserIds = data.members.map((data) => data.userId)
    const managerData = data.members.filter((data) => {
      return managerUserIds.map((Ids) => data.userId === Ids)
    })

    const handleCreateCard = async () => {
      const formData = new FormData()
      formData.append('image', obj.imageUrl)
      const { imageUrl } = await createImageMutation.mutateAsync({
        columnId: columnId,
        data: formData,
      })

      if (!(obj.dueDate instanceof Date)) {
        return
      }
      const dataObj = {
        assigneeUserId: obj.assigneeUserId,
        dashboardId: dashboardId,
        columnId: columnId,
        title: obj.title,
        description: obj.description,
        dueDate: format(new Date(obj.dueDate), 'yyyy-MM-dd HH:mm'),
        tags: obj.tags,
        imageUrl: imageUrl as string,
      }

      try {
        createCardMutation.mutate(dataObj)
      } catch (error) {
        console.log('createCardMutationError', error)
      }
    }

    const result = createModalInputValidation(obj)
    return (
      <div className={styles.container}>
        <span className={styles.title}>할일생성</span>
        <Manager managerList={managerData} />
        <Title />
        <DesCription />
        <DeadLine />
        <Tags />
        <ImageUpload />
        <div className={styles.button}>
          <ModalButton color="white" onClick={onClose}>
            취소
          </ModalButton>
          <ModalButton color="purple" onClick={handleCreateCard} disabled={!result}>
            생성
          </ModalButton>
        </div>
      </div>
    )
  }
}
