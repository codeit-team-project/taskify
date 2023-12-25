/* signun 페이지에 사용할 Form 컴포넌트

TODO - onSubmit 함수에서 error response 받을 때 alert 창 띄우는 코드를 나중에 모달창 띄우는 코드로 바꿀 것. (아님 토스트 메세지를 쓰던가 커스텀 alert를 써도 이쁠듯?)
TODO - isPending을 통해 로딩스피너 활용하는 코드 추가할 것. 
*/

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
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

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpInputsType>({ mode: 'all' })
  // isDisable: 회원가입 버튼의 활성 여부를 나타내는 state
  const [isDisable, setIsDisable] = useState(true)
  // blankBox: 이용약관 체크박스가 빈 칸인지를 나타내는 state
  const [blankBox, setBlankBox] = useState(true)
  // checkValues: input에서 이벤트가 일어날 때마다 값이 바뀌는 state
  const [checkValues, setCheckValues] = useState(true)
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  // checkSubmitAble 함수: input에 올바른 값이 있는지, 이용약관 checkbox에 체크가 되어있는지 확인하는 함수
  const checkSubmitAble = useCallback(() => {
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
  }, [getValues, blankBox, errors])

  const { mutate } = useMutation({
    mutationKey: ['create-user-key'],
    mutationFn: (data: SignUpDataType) => createUser({ data: data }),
    onMutate: () => {
      setIsPending(true)
    },
    onSuccess: () => {
      console.log('signup succeed!')
      alert('가입이 완료되었습니다!')
      router.push('/signin')
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        alert(`${error?.response?.data?.message}`)
      } else if (error?.response?.status === 409) {
        alert('이미 사용 중인 이메일입니다!')
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

  useEffect(() => {
    checkSubmitAble()
  }, [checkSubmitAble, checkValues])

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
      <button
        className={styles['submit-button']}
        disabled={isDisable || isPending}
        data-disable={isDisable}
      >
        회원가입
      </button>
    </form>
  )
}
