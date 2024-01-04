import { ChangeEvent, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import styles from './ManageColumnModal.module.scss'
import { editColumn } from '@/api/columns/editColumn'
import { getColumns } from '@/api/columns/getColumns'
import { ColumnsType } from '@/types/columnsType'
import classNames from 'classnames'
import { deleteColumn } from '@/api/columns/deleteColumn'

interface ManageColumnModalProps {
  originalTitle: string
  columnId: number
  dashBoardId: number
  onClose: () => void
}

export default function ManageColumnModal({
  originalTitle,
  columnId,
  dashBoardId,
  onClose,
}: ManageColumnModalProps) {
  const queryClient = useQueryClient()

  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isShowDelete, setIsShowDelete] = useState(false)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    if (inputValue) {
      setErrorMessage('')
    }
  }

  const { data } = useQuery<ColumnsType>({
    queryKey: ['getColumns', dashBoardId],
    queryFn: () => getColumns(dashBoardId),
    enabled: !!dashBoardId,
  })

  const columnsTitle = data?.data.map((column) => column.title)

  const { mutate: editColumnMutation, isPending: isPendingEdit } = useMutation({
    mutationKey: ['editColumn'],
    mutationFn: editColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getColumns', dashBoardId],
      })
      onClose()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
      }
    },
  })

  const { mutate: deleteColumnMutation, isPending: isPendingDelete } = useMutation({
    mutationKey: ['deleteColumn'],
    mutationFn: deleteColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getColumns', dashBoardId],
      })
      onClose()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
      }
    },
  })

  const handleEditColumn = async () => {
    const title = inputValue.trim()

    if (!title || isPendingEdit) {
      return
    }

    if (title === originalTitle) {
      setErrorMessage('기존 컬럼 이름과 동일합니다.')
      return
    }

    if (columnsTitle?.includes(title)) {
      setErrorMessage('중복된 컬럼 이름입니다.')
      return
    }

    editColumnMutation({
      columnId,
      data: {
        title,
      },
    })
  }

  const handleDeleteColumn = async () => {
    deleteColumnMutation(columnId)
  }

  return (
    <div className={styles['modal-container']}>
      <div className={classNames(styles['manage-container'], isShowDelete && styles['no-show'])}>
        <h2 className={styles.title}>컬럼 관리</h2>
        <div className={styles.contents}>
          <p className={styles['sub-title']}>이름</p>
          <input
            className={classNames(styles.input, {
              [styles['input-error']]: !!errorMessage,
            })}
            onChange={handleChangeInput}
            value={inputValue}
            placeholder={originalTitle}
          />
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
        <div className={styles['button-container']}>
          <button className={styles['button-delete-confirm']} onClick={() => setIsShowDelete(true)}>
            삭제하기
          </button>
          <button className={styles['button-cancel']} onClick={() => onClose()}>
            취소
          </button>
          <button
            className={classNames(styles['button-change'], {
              [styles.inActive]: !inputValue.trim() || isPendingEdit,
            })}
            onClick={handleEditColumn}
            disabled={isPendingEdit}
          >
            변경
          </button>
        </div>
      </div>
      <div
        className={classNames(
          styles['delete-confirm-container'],
          !isShowDelete && styles['no-show'],
        )}
      >
        <p className={styles['delete-confirm-text']}>컬럼의 모든 카드가 삭제됩니다.</p>
        <div className={styles['button-container']}>
          <button className={styles['button-delete-cancel']} onClick={() => setIsShowDelete(false)}>
            취소
          </button>
          <button
            className={classNames(styles['button-delete'], isPendingDelete && styles.inActive)}
            onClick={handleDeleteColumn}
            disabled={isPendingDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
