/* signin 페이지에 사용할 Form 컴포넌트 */

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'

import { createLogin } from '@/api/auth/createLogin'
import { toastUsingButton } from '@/components/customToast/CustomToast'
import PasswordInput from '@/components/signInput/PasswordInput'
import TextInput from '@/components/signInput/TextInput'
import { SignInDataType } from '@/types/auth'
import { emailValidationRules, passwordValidationRules } from '@/utils/formInputValidationRules'

import styles from './SignForm.module.scss'
import { setCookie } from '@/utils/cookie'

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInDataType>({ mode: 'all' })
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const { mutate } = useMutation({
    mutationKey: ['create-login-key'],
    mutationFn: (data: SignInDataType) => createLogin({ data: data }),
    onMutate: () => {
      setIsPending(true)
    },
    onSuccess: (response) => {
      const accessToken = response?.data?.accessToken
      if (accessToken) {
        setCookie('accessToken', accessToken)
      }
      router.push('/mydashboard')
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
      password: getValues('password'),
    })
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
      <button disabled={isPending} className={styles['submit-button']}>
        로그인
      </button>
    </form>
  )
}
