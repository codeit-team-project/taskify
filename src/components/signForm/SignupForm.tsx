/* signun 페이지에 사용할 Form 컴포넌트*/

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'

import { createUser } from '@/api/users/createUser'
import ServiceChekInput from '@/components/serviceCheckInput/ServiceCheckInput'
import PasswordInput from '@/components/signInput/PasswordInput'
import TextInput from '@/components/signInput/TextInput'
import { SignUpInputsType } from '@/types/formTypes'
import { SignUpDataType } from '@/types/auth'
import {
  emailValidationRules,
  nicknameValidationRules,
  passwordValidationRules,
} from '@/utils/formInputValidationRules'

import styles from './SignForm.module.scss'
import { toastUsingButton } from '../customToast/CustomToast'

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<SignUpInputsType>({ mode: 'all' })
  // blankBox: 이용약관 체크박스가 빈 칸인지를 나타내는 state
  const [blankBox, setBlankBox] = useState(true)
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const { mutate } = useMutation({
    mutationKey: ['create-user-key'],
    mutationFn: (data: SignUpDataType) => createUser({ data: data }),
    onMutate: () => {
      setIsPending(true)
    },
    onSuccess: () => {
      toastUsingButton('가입이 완료되었습니다!')
      router.push('/signin')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toastUsingButton(error.response?.data.message)
      } else return
    },
    onSettled: () => {
      setIsPending(false)
    },
  })

  const onSubmit = () => {
    mutate({
      email: getValues('email'),
      nickname: getValues('nickname'),
      password: getValues('password'),
    })
  }

  const passwordRepeatChecker = (passwordRepeatValue: string) => {
    if (getValues('password') !== passwordRepeatValue) {
      return '비밀번호가 일치하지 않습니다.'
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <ServiceChekInput setBlank={setBlankBox} />
      </div>
      <button
        className={styles['submit-button']}
        disabled={!isValid || blankBox || isPending}
        data-disable={!isValid || blankBox || isPending}
      >
        회원가입
      </button>
    </form>
  )
}
