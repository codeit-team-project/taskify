/* Mypage에 들어갈 프로필 컴포넌트

- 이미지 업로드 기능
- 닉네임 변경 기능
 */
import ImageUploader from './imageUploader/ImageUploader'
import styles from './Profile.module.scss'
import { useForm } from 'react-hook-form'
import { SignUpInputsType } from '@/types/formTypes'
import { nicknameValidationRules } from '@/utils/formInputValidationRules'
import TextInput from '../signInput/TextInput'

export default function Profile() {
  const {
    register,
    // handleSubmit,
    formState: { errors, isValid },
    // getValues,
  } = useForm<SignUpInputsType>({ mode: 'all' })

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>프로필</h2>
      <form className={styles.form}>
        <ImageUploader />
        <div>
          <div>
            <h3>이메일</h3>
            <div>{''}</div>
          </div>
          <div>
            <TextInput
              placeholder="닉네임을 입력해 주세요."
              labelName="닉네임"
              {...register('nickname', nicknameValidationRules)}
              hasError={errors}
            />
            {errors.nickname && (
              <div className={styles['error-message']} role="alert">
                {errors.nickname.message}
              </div>
            )}
          </div>
        </div>
        <button disabled={!isValid} className={styles.button}>
          저장
        </button>
      </form>
    </div>
  )
}
