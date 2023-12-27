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
import { ProfileReqType } from '@/types/formTypes'
import { imgFileValidationRules } from '@/utils/formInputValidationRules'
import { useState } from 'react'
import { editUser } from '@/api/users/editUser'

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
  const [isEditing, setIsEditing] = useState(false)
  const [imgUrl, setImgUrl] = useState(userProfile?.profileImageUrl ?? '')

  const { mutate } = useMutation({
    mutationKey: ['edit-profile-key'],
    mutationFn: (data: ProfileReqType) => editUser({ data: { ...data } }),
    onError: (e) => {
      console.log(e)
    },
  })

  const onSubmit = () => {
    if (!isValid) {
      return
    }
    if (!isEditing) {
      setIsEditing(true)
    }
    if (isValid && isEditing) {
      const changedNickname =
        getValues('nickname') === '' ? userProfile?.nickname : getValues('nickname')
      const changedImg = getValues('image') ? imgUrl : userProfile?.profileImageUrl
      const newData: ProfileReqType = {
        nickname: changedNickname ?? '',
        profileImageUrl: changedImg ?? '',
      }
      console.log(newData)
      mutate(newData)
      alert('저장되었습니다.')
      setIsEditing(false)
    } else {
      return
    }
  }

  return (
    <div className={styles.container} data-isEditing={isEditing}>
      <h1 className={styles.title}>프로필</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          {isEditing ? (
            <ImageUploader
              {...register('image', imgFileValidationRules)}
              savedImg={userProfile?.profileImageUrl}
              hasError={errors}
              watch={watch}
              setImgUrl={setImgUrl}
            />
          ) : (
            <div className={styles['saved-img']}>
              <img src={userProfile?.profileImageUrl ?? '/assets/settingIcon.svg'} />
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
          <button disabled={!isValid} className={styles.button}>
            {isEditing ? '저장' : '변경'}
          </button>
        </div>
      </form>
    </div>
  )
}
