/* signun 페이지에 사용할 Form 컴포넌트

TODO - onSubmit 코드 구현할 것.
TODO - onSubmit 할 때 만약 비밀번호가 잘못됐다든가 등 error가 발생하면 errors 객체를 통해 에러 문구 띄우는 코드 구현할 것.
- react-hook-form을 사용하여 구현
 */

import { useForm } from 'react-hook-form'
import EmailInput from '@/components/signInput/EmailInput'
import PasswordInput from '@/components/signInput/PasswordInput'
import { SignupFormValueType } from '@/types/formTypes'
import { emailValidationRules, passwordValidationRules } from '@/utils/formInputValidationRules'
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

  const passwordRepeatChecker = (passwordRepeatValue: string) => {
    if (getValues('password') !== passwordRepeatValue) {
      return '비밀번호가 일치하지 않습니다.'
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['signinput-container']}>
        <EmailInput
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
    </form>
  )
}
