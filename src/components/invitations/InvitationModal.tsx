/**
 * @TODO 초대하기 모달
 * 공통 modal container로 변경하기
 * pending일때 로딩스피너 보여주기 (초대 완료일때만)
 */
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
  // const [errorMessage, setErrorMessage] = useState('')

  const {
    mutate: createInvitation,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['createInvitation'],
    mutationFn: createDashBoardInvitations,
    // onSuccess 로직을 분리하는 방법
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashBoardsInvitations', dashBoardId],
      })
      // setErrorMessage('')
      onClose()
    },
    // onError: (error) => {
    //   if (error instanceof AxiosError) {
    //     setErrorMessage(error.response?.data.message)
    //   }
    // },
  })
  console.log(error)

  const errorMessage = (function () {
    if (error instanceof AxiosError) {
      return error.response?.data.message ?? ''
    }
    return ''
  })()

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    // if (inputValue) {
    //   setErrorMessage('')
    // }
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
