import { useQuery, useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import Manager from '@/components/modalInput/Manager'
import styles from './EditTodo.module.scss'
import Title from '@/components/modalInput/Title'
import DesCription from '@/components/modalInput/DesCription'
import DeadLine from '@/components/modalInput/DeadLine'
import Tags from '@/components/modalInput/Tags'
import ImageUpload from '@/components/modalInput/ImageUpload'
import ModalButton from '@/components/modalButton/ModalButton'
import { getCardDetail } from '@/api/cards/getCardDetail'
import { useContext } from 'react'
import { getDashBoardMembers } from '@/api/members/getMembers'
import ColumnName from '@/components/modalInput/ColumnName'
import { editCard, editCardType } from '@/api/cards/editCard'
import { FormContext } from '@/context/formContext'
import {
  CreateColumnImageUploadType,
  createColumnImageUpload,
} from '@/api/columns/createColumnImageUpload'
import { ColumnType } from '@/types/columnsType'
import { resetFormStatus } from '@/utils/resetFormState'
import { editModalInputValidation } from '@/utils/modalInputValidation'

interface EditTodoProps {
  cardId: number
  columnId: number
  dashboardId: number
  setSelectedItem: Function
  targetColumn: string
  columnList: ColumnType[]
  onClose: () => void
  refetchColumnList: (columnId: number) => void
}
export default function EditTodo({
  refetchColumnList,
  onClose,
  dashboardId,
  cardId,
  columnId,
  setSelectedItem,
  columnList,
}: EditTodoProps) {
  const obj = useContext(FormContext)

  const cardDetailQuery = useQuery({
    queryKey: ['detailCard', cardId],
    queryFn: () => getCardDetail(cardId),
  })

  const dashBoardQuery = useQuery({
    queryKey: ['getDashBaordMembers'],
    queryFn: () => getDashBoardMembers(dashboardId),
  })

  const editCardMutation = useMutation({
    mutationFn: ({ cardId, data }: { cardId: number; data: editCardType }) =>
      editCard(cardId, data),
    onSuccess() {
      refetchColumnList(columnId)
      resetFormStatus(obj)
      onClose()
    },
    onError(error) {
      console.log(error)
    },
  })

  const createImageMutation = useMutation({
    mutationFn: ({ columnId, data }: CreateColumnImageUploadType) =>
      createColumnImageUpload({ columnId, data }),
  })
  const handleCancelCard = () => {
    setSelectedItem('')
  }

  const handleEditCard = async () => {
    let newImageUrl = obj.imageUrl

    if (obj.imageUrl instanceof File) {
      const formData = new FormData()
      formData.append('image', obj.imageUrl)
      const { imageUrl } = await createImageMutation.mutateAsync({
        columnId: columnId,
        data: formData,
      })
      newImageUrl = imageUrl
    }

    if (!(obj.dueDate instanceof Date)) {
      return null
    }
    const editObect = {
      cardId: cardId,
      data: {
        columnId: obj.columnId,
        assigneeUserId: obj.assigneeUserId,
        title: obj.title,
        description: obj.description,
        dueDate: format(obj.dueDate, 'yyyy-MM-dd HH:mm'),
        tags: obj.tags,
        imageUrl: newImageUrl as string,
      },
    }

    editCardMutation.mutate(editObect)
  }

  const { assignee, title, description, dueDate, tags, imageUrl } = cardDetailQuery.data!
  const managerList = dashBoardQuery?.data?.members
  const editColumnId = cardDetailQuery.data!.columnId
  const editTitle = columnList.find((item) => item.id === editColumnId)!.title
  const result = editModalInputValidation(obj)
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>할일수정</span>
        <div className={styles.profile__wrapper}>
          <ColumnName editColumn={editTitle} editColumnId={editColumnId} columnList={columnList} />
          <Manager
            managerId={assignee.id}
            editName={assignee.nickname}
            profileImageUrl={assignee.profileImageUrl}
            managerList={managerList}
          />
        </div>
        <Title EditTitle={title} />
        <DesCription EditDesScription={description} />
        <DeadLine EditDeadLine={dueDate} />
        <Tags EditTags={tags} />
        <ImageUpload EditImageUrl={imageUrl} />
        <div className={styles.button}>
          <ModalButton color="white" onClick={handleCancelCard}>
            취소
          </ModalButton>
          <ModalButton color="purple" onClick={handleEditCard} disabled={!result}>
            수정
          </ModalButton>
        </div>
      </div>
    </>
  )
}
