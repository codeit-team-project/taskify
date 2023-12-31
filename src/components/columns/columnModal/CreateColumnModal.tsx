/**
 * @TODO 컬럼 생성 모달
 * 모달 컨테이너로 감싸기
 */
import { ChangeEvent, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import classNames from 'classnames'

import styles from './CreateColumnModal.module.scss'
import { createColumn } from '@/api/columns/createColumn'
import { getColumns } from '@/api/columns/getColumns'
import { ColumnsType } from '@/types/columnsType'

interface CreateColumnModalProps {
  dashBoardId: number
  onClose: () => void
}

export default function CreateColumnModal({ dashBoardId, onClose }: CreateColumnModalProps) {
  const queryClient = useQueryClient()

  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const { data } = useQuery<ColumnsType>({
    queryKey: ['getColumns', dashBoardId],
    queryFn: () => getColumns(dashBoardId),
  })

  const columnsTitle = data?.data.map((column) => column.title)

  const {
    mutate: createColumnMutation,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ['createColumn'],
    mutationFn: createColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getColumns', dashBoardId],
      })
      onClose()
    },
    onError: (error) => {
      if (isError && error instanceof AxiosError) {
        return error.response?.data.message ?? ''
      }
    },
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    if (inputValue) {
      setErrorMessage('')
    }
  }

  const handleCreateInvitation = async () => {
    const title = inputValue.trim()

    if (columnsTitle?.includes(title)) {
      setErrorMessage('중복된 컬럼 이름입니다.')
      return
    }

    if (!title || isPending) {
      return
    }

    createColumnMutation({
      title,
      dashboardId: dashBoardId,
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>새 컬럼 생성</h2>
      <div className={styles.contents}>
        <p className={styles['sub-title']}>이름</p>
        <input
          className={classNames(styles.input, {
            [styles['input-error']]: !!errorMessage,
          })}
          onChange={handleChangeInput}
          value={inputValue}
          placeholder="컬럼 이름을 입력해주세요"
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
      <div className={styles.buttons}>
        <button className={styles['default-button']} onClick={() => onClose()}>
          취소
        </button>
        <button
          className={classNames(styles['primary-button'], {
            [styles.inActive]: !inputValue.trim() || isPending,
          })}
          onClick={handleCreateInvitation}
        >
          생성
        </button>
      </div>
    </div>
  )
}
