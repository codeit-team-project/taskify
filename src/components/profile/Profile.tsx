/* Mypage에 들어갈 프로필 컴포넌트

- 이미지 업로드 기능
- 닉네임 변경 기능
 */

import ImageUploader from './imageUploader/ImageUploader'
import styles from './Profile.module.scss'
import { useForm } from 'react-hook-form'
import { ProfileInputsType } from '@/types/formTypes'
import { noRequiredNicknameValidationRules } from '@/utils/formInputValidationRules'
import TextInput from '../signInput/TextInput'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUser } from '@/api/users/getUser'
import { UserType } from '@/types/users'
import Image from 'next/image'
import { imgFileValidationRules } from '@/utils/formInputValidationRules'
import { ChangeEvent, useState } from 'react'
import { editUser } from '@/api/users/editUser'
import { createUserImageUpload } from '@/api/users/createUserImageUpload'

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm<ProfileInputsType>({ mode: 'all' })
  const { data: userProfile } = useQuery<UserType>({
    queryKey: ['profile-key'],
    queryFn: () => getUser(),
  })
  // 현재 editing 상태인지 아닌지 체크하는 state
  const [isEditing, setIsEditing] = useState(false)
  // 이미지를 업로드할 때 쓸 imgFormData state
  const [imgFormData, setImgFormData] = useState<FormData>()

  const { mutate } = useMutation({
    mutationKey: ['create-img-key', 'edit-profile-key'],
    mutationFn: (data: FormData) => {
      console.log(data)
      return createUserImageUpload({ profileImageUrl: data })
    },
    onSuccess: (response) => {
      const newData = {
        nickname: getValues('nickname'),
        profileImageUrl: response.profileImageUrl,
      }
      editUser({ data: { ...newData } })
      return response
    },
    onError: (e) => {
      return e
    },
  })

  const handleCancelEdit = (e: ChangeEvent) => {
    e.preventDefault()
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
      if (!imgFormData) return
      console.log(imgFormData.get('profileImageUrl'))
      mutate(imgFormData)
      alert('저장되었습니다.')
      setIsEditing(false)
    } else {
      return
    }
  }

  return (
    <div className={styles.container} data-isediting={isEditing}>
      <h1 className={styles.title}>프로필</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputs}>
          {isEditing ? (
            <ImageUploader
              {...register('image', imgFileValidationRules)}
              savedImg={userProfile?.profileImageUrl}
              hasError={errors}
              watch={watch}
              setImgFormData={setImgFormData}
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
            <div className={styles['email-wrapper']}>
              <h3>이메일</h3>
              <div className={styles['email-input']}>{userProfile?.email ?? ''}</div>
            </div>
            <div className={styles['nickname-input']}>
              {isEditing ? (
                <>
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
                </>
              ) : (
                <>
                  <h3>닉네임</h3>
                  <div className={styles['email-input']}>{userProfile?.nickname ?? ''}</div>
                </>
              )}
            </div>
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
          <button disabled={!isValid} className={styles.button}>
            {isEditing ? '저장' : '변경'}
          </button>
        </div>
      </form>
    </div>
  )
}
