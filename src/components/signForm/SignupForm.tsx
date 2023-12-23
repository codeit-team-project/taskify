/* signun 페이지에 사용할 Form 컴포넌트

- react-hook-form을 사용하여 구현
 */

import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { createUser } from '@/api/users/createUser'
import ServiceChekInput from '@/components/serviceCheckInput/ServiceCheckInput'
import PasswordInput from '@/components/signInput/PasswordInput'
import TextInput from '@/components/signInput/TextInput'
import { SignUpFormValueType } from '@/types/auth'
import {
  emailValidationRules,
  nicknameValidationRules,
  passwordValidationRules,
} from '@/utils/formInputValidationRules'
import styles from './SignForm.module.scss'

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormValueType>({ mode: 'all' })
  const [isDisable, setIsDisable] = useState(true)
  const [blankBox, setBlankBox] = useState(true)
  const [checkValues, setCheckValues] = useState(true)

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      getValues('email') &&
      getValues('password') &&
      getValues('nickname') &&
      getValues('passwordRepeat') &&
      !blankBox
    ) {
      setIsDisable(false)
    } else {
      setIsDisable(true)
    }
  }, [errors, getValues, checkValues, blankBox])

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
          check={checkValues}
          setCheck={setCheckValues}
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
          check={checkValues}
          setCheck={setCheckValues}
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
          check={checkValues}
          setCheck={setCheckValues}
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
          check={checkValues}
          setCheck={setCheckValues}
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
      <button disabled={isDisable}>제출</button>
    </form>
  )
}
