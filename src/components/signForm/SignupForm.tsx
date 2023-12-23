/* signun 페이지에 사용할 Form 컴포넌트

- react-hook-form을 사용하여 구현
 */

import { useForm } from 'react-hook-form'
import TextInput from '@/components/signInput/TextInput'
import PasswordInput from '@/components/signInput/PasswordInput'
import { SignUpFormValueType } from '@/types/auth'
import {
  emailValidationRules,
  nicknameValidationRules,
  passwordValidationRules,
} from '@/utils/formInputValidationRules'
import styles from './SignForm.module.scss'
import { createUser } from '@/api/users/createUser'
import { isAxiosError } from 'axios'
import ServiceChekInput from '../serviceCheckInput/ServiceCheckInput'

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormValueType>({ mode: 'all' })

  const onSubmit = () => {
    const res = createUser({
      data: {
        email: getValues('email'),
        nickname: getValues('nickname'),
        password: getValues('password'),
      },
    })
    if (isAxiosError(res)) {
      console.log('failed')
    } else {
      console.log('ok')
    }
  }

  const passwordRepeatChecker = (passwordRepeatValue: string) => {
    if (getValues('password') !== passwordRepeatValue) {
      return '비밀번호가 일치하지 않습니다.'
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['signinput-container']}>
        <TextInput
          placeholder="이메일을 입력해 주세요."
          labelName="이메일"
          {...register('email', emailValidationRules)}
          hasError={errors}
        />
        {errors.email && (
          <div className={styles['error-message']} role="alert">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className={styles['signinput-container']}>
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

      <div className={styles['signinput-container']}>
        <PasswordInput
          placeholder="비밀번호를 입력해 주세요."
          labelName="비밀번호"
          {...register('password', passwordValidationRules)}
          hasError={errors}
        />
        {errors.password && (
          <div className={styles['error-message']} role="alert">
            {errors.password.message}
          </div>
        )}
      </div>

      <div className={styles['signinput-container']}>
        <PasswordInput
          placeholder="비밀번호를 다시 입력해 주세요."
          labelName="비밀번호 확인"
          {...register('passwordRepeat', {
            required: '비밀번호를 확인해 주세요.',
            validate: {
              check: passwordRepeatChecker,
            },
          })}
          hasError={errors}
        />
        {errors.passwordRepeat && (
          <div className={styles['error-message']} role="alert">
            {errors.passwordRepeat.message}
          </div>
        )}
      </div>

      <div className={styles['signinput-container']}>
        <ServiceChekInput />
      </div>
      <button>제출</button>
    </form>
  )
}
