/* signun 페이지에 사용할 Form 컴포넌트

TODO - 시간 난다면 request 받는 중에 isPending 값을 true로 두고, 
      isPending 이 true일 때엔 spinner.gif를 띄우고 버튼 disabled로 상태 바꾸다가
      response를 받으면 spinner.gif 사라지게 하면서 다시 버튼 활상화 시키는 코드를 짜볼 것...
TODO - onSubmit 함수에서 error response 받을 때 alert 창 띄우는 코드를 나중에 모달창 띄우는 코드로 바꿀 것. (아님 토스트 메세지를 쓰던가 커스텀 alert를 써도 이쁠듯?)
 */

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

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
  // isDisable: 회원가입 버튼의 활성 여부를 나타내는 state
  const [isDisable, setIsDisable] = useState(true)
  // blankBox: 이용약관 체크박스가 빈 칸인지를 나타내는 state
  const [blankBox, setBlankBox] = useState(true)
  // checkValues: input에서 이벤트가 일어날 때마다 값이 바뀌는 state
  const [checkValues, setCheckValues] = useState(true)
  const router = useRouter()

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

  const onSubmit = () => {
    createUser({
      data: {
        email: getValues('email'),
        nickname: getValues('nickname'),
        password: getValues('password'),
      },
    })
      .then((response) => {
        if (response.status < 300 && response.status >= 200) {
          alert('가입이 완료되었습니다!')
          router.push('/signin')
        }
      })
      .catch((e) => {
        if (e.response.status === 409) {
          alert('이미 사용 중인 이메일입니다!')
        } else return
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
      <button className={styles['submit-button']} disabled={isDisable} data-disable={isDisable}>
        회원가입
      </button>
    </form>
  )
}
