/* Mypage에 들어갈 비밀번호 변경 컴포넌트

- 이미지 업로드 기능
- 닉네임 변경 기능
 */

import { MouseEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { editPassword } from '@/api/auth/editPassword'
import EditFormLayout from '@/components/editForm/EditFormLayout'
import ReadonlyInput from '@/components/signInput/ReadonlyInput'
import PasswordInput from '@/components/signInput/PasswordInput'
import { passwordValidationRules } from '@/utils/formInputValidationRules'
import { PasswordModifierInputsType } from '@/types/formTypes'

import styles from './PasswordModifier.module.scss'
import { PasswordCheckVauleType } from '@/types/auth'

export default function PasswordModifier() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    resetField,
    getValues,
  } = useForm<PasswordModifierInputsType>({ mode: 'all' })

  // 현재 editing 상태인지 아닌지 체크하는 state
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['psw-key'],
    mutationFn: (data: PasswordCheckVauleType) => editPassword({ data }),
    onMutate: () => {
      setIsEditing(true)
    },
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다!')
    },
    onError: (error) => {
      if (error.response.status === 400) {
        alert(error.response.data.message)
      } else if (error.response.status === 404) {
        alert('존재하지 않는 유저입니다')
      }
      console.log(error)
    },
    onSettled: async () => {
      // 변경된 데이터 refetch
      setIsEditing(false)
      resetField('currentPsw')
      resetField('newPsw')
      resetField('newPswCheck')
      await queryClient.invalidateQueries()
    },
  })

  // 수정 취소 버튼
  const handleCancelEdit: MouseEventHandler = (e) => {
    e.preventDefault()
    queryClient.invalidateQueries()
    resetField('currentPsw')
    resetField('newPsw')
    resetField('newPswCheck')
    setIsEditing(false)
    return
  }

  const onSubmit = () => {
    if (!isEditing) {
      setIsEditing(true)
    }
    if (isValid && isEditing) {
      const newData = {
        password: getValues('currentPsw'),
        newPassword: getValues('newPsw'),
      }
      mutate(newData)
    } else {
      return
    }
  }

  const passwordRepeatChecker = (passwordRepeatValue: string) => {
    if (getValues('newPsw') !== passwordRepeatValue) {
      return '비밀번호가 일치하지 않습니다.'
    }
  }

  return (
    <EditFormLayout isEditing={isEditing} title="비밀번호 변경">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputs}>
          <div className={styles['input-wrapper']}>
            {isEditing ? (
              <>
                <div>
                  <PasswordInput
                    placeholder="현재 비밀번호 입력"
                    labelName="현재 비밀번호"
                    {...register('currentPsw', passwordValidationRules)}
                    hasError={errors}
                  />
                  {errors.currentPsw && (
                    <div className={styles['error-message']} role="alert">
                      {errors.currentPsw.message}
                    </div>
                  )}
                </div>

                <div>
                  <PasswordInput
                    placeholder="새 비밀번호 입력"
                    labelName="새 비밀번호"
                    {...register('newPsw', passwordValidationRules)}
                    hasError={errors}
                  />
                  {errors.newPsw && (
                    <div className={styles['error-message']} role="alert">
                      {errors.newPsw.message}
                    </div>
                  )}
                </div>

                <div>
                  <PasswordInput
                    placeholder="새 비밀번호 확인"
                    labelName="새 비밀번호 확인"
                    {...register('newPswCheck', {
                      required: '비밀번호를 확인해 주세요.',
                      validate: {
                        check: passwordRepeatChecker,
                      },
                    })}
                    hasError={errors}
                  />
                  {errors.newPswCheck && (
                    <div className={styles['error-message']} role="alert">
                      {errors.newPswCheck.message}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <ReadonlyInput labelName="현재 비밀번호" inputText="현재 비밀번호 입력" />
                <ReadonlyInput labelName="새 비밀번호" inputText="새 비밀번호 입력" />
                <ReadonlyInput labelName="새 비밀번호 확인" inputText="새 비밀번호 확인" />
              </>
            )}
          </div>
        </div>

        <div className={styles['button-wrapper']}>
          <button
            type="reset"
            className={styles['cancel-button']}
            data-isediting={isEditing}
            onClick={handleCancelEdit}
          >
            취소
          </button>
          <button className={styles.button}>{isEditing ? '저장' : '변경'}</button>
        </div>
      </form>
    </EditFormLayout>
  )
}
