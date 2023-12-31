/* Mypage에 들어갈 프로필 컴포넌트

- 이미지 업로드 기능
- 닉네임 변경 기능
 */

import { MouseEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getUser } from '@/api/users/getUser'
import { createUserImageUpload } from '@/api/users/createUserImageUpload'
import { editUser } from '@/api/users/editUser'
import EditFormLayout from '@/components/editForm/EditFormLayout'
import ReadonlyInput from '@/components/signInput/ReadonlyInput'
import TextInput from '@/components/signInput/TextInput'
import { ProfileInputsType } from '@/types/formTypes'
import { UserType } from '@/types/users'
import { imgFileValidationRules } from '@/utils/formInputValidationRules'
import { noRequiredNicknameValidationRules } from '@/utils/formInputValidationRules'

import ImageUploader from './imageUploader/ImageUploader'
import styles from './Profile.module.scss'

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
    resetField,
  } = useForm<ProfileInputsType>({ mode: 'all' })

  const { data: userProfile } = useQuery<UserType>({
    queryKey: ['profile-key'],
    queryFn: () => getUser(),
  })
  // 현재 editing 상태인지 아닌지 체크하는 state
  const [isEditing, setIsEditing] = useState(false)
  // 이미지를 업로드할 때 쓸 imgFormData state
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['edit-profile-key'],
    mutationFn: () => {
      if (getValues('image')?.length > 0) {
        // 이미지 input 값이 있을 경우 mutationFn을 실행하고 onSuccess 콜백 실행
        const formData = new FormData()
        formData.append('image', getValues('image')[0])
        return createUserImageUpload(formData)
      } else {
        // 이미지 값이 없을 경우 onError 콜백 실행
        throw new Error('이미지 값이 없습니다.')
      }
    },
    onSuccess: (response) => {
      // 닉네임 input이 있을 경우와 없을 경우 둘 다 처리함
      const newData = {
        nickname: getValues('nickname') ? getValues('nickname') : (userProfile?.nickname as string),
        profileImageUrl: response.profileImageUrl,
      }
      editUser({ data: { ...newData } })
      return response
    },
    onError: (e) => {
      // 이미지 input이 없을 경우에도 닉네임 input 있을 때 없을 때 둘 다 처리 가능
      const newData = {
        nickname: getValues('nickname') ? getValues('nickname') : (userProfile?.nickname as string),
        profileImageUrl: userProfile?.profileImageUrl as string,
      }
      editUser({ data: { ...newData } })
      return e
    },
    onSettled: async () => {
      // 변경된 데이터 refetch
      alert('저장되었습니다.')
      setIsEditing(false)
      await queryClient.invalidateQueries({ queryKey: ['profile-key'] })
    },
  })

  // 수정 취소 버튼
  const handleCancelEdit: MouseEventHandler = (e) => {
    e.preventDefault()
    resetField('nickname')
    resetField('image')
    setIsEditing(false)
    return
  }

  const onSubmit = () => {
    if (!isValid) {
      return
    }
    if (!isEditing) {
      setIsEditing(true)
    }
    if (isValid && isEditing) {
      mutate()
    } else {
      return
    }
  }

  return (
    <EditFormLayout isEditing={isEditing} title="프로필">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputs}>
          {isEditing ? (
            <ImageUploader
              {...register('image', imgFileValidationRules)}
              savedImg={userProfile?.profileImageUrl as string | null}
              watch={watch}
            />
          ) : (
            <div className={styles['saved-img']}>
              <Image
                src={userProfile?.profileImageUrl ?? '/assets/addIcon.svg'}
                alt="img preview"
                layout="fill"
                priority={true}
              />
            </div>
          )}
          <div className={styles['input-wrapper']}>
            <ReadonlyInput labelName="이메일" inputText={userProfile?.email ?? ''} />
            <>
              {isEditing ? (
                <div>
                  <TextInput
                    placeholder={userProfile?.nickname ?? ''}
                    labelName="닉네임"
                    {...register('nickname', noRequiredNicknameValidationRules)}
                    hasError={errors}
                  />
                  {errors.nickname && (
                    <div className={styles['error-message']} role="alert">
                      {errors.nickname.message}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <ReadonlyInput labelName="닉네임" inputText={userProfile?.nickname ?? ''} />
                </>
              )}
            </>
          </div>
        </div>
        <div className={styles['button-wrapper']}>
          <button
            className={styles['cancel-button']}
            data-isediting={isEditing}
            onClick={handleCancelEdit}
          >
            취소
          </button>
          <button disabled={!isValid || isPending} className={styles.button}>
            {isEditing ? '저장' : '변경'}
          </button>
        </div>
      </form>
    </EditFormLayout>
  )
}
