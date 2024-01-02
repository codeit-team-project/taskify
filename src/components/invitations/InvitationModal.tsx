import { ChangeEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import styles from './InvitationModal.module.scss'
import { createDashBoardInvitations } from '@/api/dashboards/createDashboardsInvitations'
import classNames from 'classnames'

interface InvitationModalProps {
  dashBoardId: number
  onClose: () => void
}

export default function InvitationModal({ dashBoardId, onClose }: InvitationModalProps) {
  const queryClient = useQueryClient()

  const [inputValue, setInputValue] = useState('')

  const {
    mutate: createInvitation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ['createInvitation'],
    mutationFn: createDashBoardInvitations,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashBoardsInvitations', dashBoardId],
      })
      onClose()
    },
  })

  const errorMessage = (function () {
    if (isError && error instanceof AxiosError) {
      return error.response?.data.message ?? ''
    }
    return ''
  })()

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleCreateInvitation = async () => {
    if (!inputValue || isPending) {
      return
    }

    createInvitation({
      id: dashBoardId,
      data: {
        email: inputValue,
      },
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>초대하기</h2>
      <div className={styles.contents}>
        <p className={styles['sub-title']}>이메일</p>
        <input
          className={classNames(styles.input, {
            [styles['input-error']]: !!errorMessage,
          })}
          onChange={handleChangeInput}
          value={inputValue}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
      <div className={styles.buttons}>
        <button className={styles['default-button']} onClick={() => onClose()}>
          취소
        </button>
        <button
          className={classNames(styles['primary-button'], {
            [styles.inActive]: !inputValue || isPending,
          })}
          onClick={handleCreateInvitation}
        >
          초대
        </button>
      </div>
    </div>
  )
}
