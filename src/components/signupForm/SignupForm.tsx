/* signun 페이지에 사용할 Form 컴포넌트

TODO - onSubmit 코드 구현할 것.
- react-hook-form을 사용하여 구현
 */

import { useForm } from 'react-hook-form'
import EmailInput from '@/components/signInput/EmailInput'
import PasswordInput from '@/components/signInput/PasswordInput'
import { SignupFormValueType } from '@/types/formTypes'
import { emailReg, passwordReg } from '@/utils/regExpressions'
import styles from './SignupForm.module.scss'

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupFormValueType>({ mode: 'all' })

  const onSubmit = () => {
    // post request 보내는 코드
    console.log(getValues('email'))
    console.log(getValues('password'))
    console.log(getValues('passwordRepeat'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['signinput-container']}>
        <EmailInput
          id="email"
          placeholder="이메일을 입력해 주세요."
          labelName="이메일"
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: emailReg,
              message: '이메일 형식으로 작성해 주세요.',
            },
          })}
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
          id="password"
          placeholder="비밀번호를 입력해 주세요."
          labelName="비밀번호"
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            minLength: {
              value: 8,
              message: '8자리 이상 입력해 주세요.',
            },
            pattern: {
              value: passwordReg,
              message: '비밀번호는 영어 대, 소문자와 숫자가 각각 1개 이상 포함되게 해주세요.',
            },
          })}
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
          id="passwordRepeat"
          placeholder="비밀번호를 다시 입력해 주세요."
          labelName="비밀번호 확인"
          {...register('passwordRepeat', {
            required: '비밀번호를 확인해 주세요.',
            validate: {
              check: (val) => {
                if (getValues('password') !== val) {
                  return '비밀번호가 일치하지 않습니다.'
                }
              },
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
    </form>
  )
}