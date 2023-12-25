/**
 * @TODO 초대하기 모달
 * ㄴ 초대하기 버튼 누르면 초대하기 모달이 나타남 (완료)
 * ㄴ input으로 이메일을 입력하면 초대 버튼 활성화, 미입력시 비활성화, 최소 기능 (완료)
 * ㄴ 버튼을 클릭했을 때 data 유효성 검사 (4가지 예외 상황) (완료)
 * ㄴ 예외 상황에 따른 에러 message 스타일링 (칼럼 모달 디자인 참고) (완료)
 * ㄴ 초대하기 버튼스타일링 (+ 빈응형)
 * ㄴ isPending, 에러일때 비활성화 스타일 (완료)
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
  const [errorMessage, setErrorMessage] = useState('')

  const { mutate: createInvitation, isPending } = useMutation({
    mutationKey: ['createInvitation'],
    mutationFn: createDashBoardInvitations,
    // onSuccess 로직을 분리하는 방법
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashBoardsInvitations', dashBoardId],
      })
      setErrorMessage('')
      onClose()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
      }
    },
  })

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

    /** await가 적용되지 않는 이유, res가 undefined인 이유, 에러 처리 */
    // try {
    //   const res = await createInvitation({
    //     // 'await' has no effect on the type of this expression.ts(80007)
    //     id: dashBoardId,
    //     data: {
    //       email: 'dev_code@taskify.com',
    //     },
    //   })
    //   console.log(res) // undefined
    // } catch (error) {
    //   console.log(error)
    // }
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
