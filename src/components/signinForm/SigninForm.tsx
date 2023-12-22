/* signin 페이지에 사용할 Form 컴포넌트

TODO - onSubmit 코드 구현할 것.
TODO - onSubmit 할 때 만약 비밀번호가 잘못됐다든가 등 error가 발생하면 errors 객체를 통해 에러 문구 띄우는 코드 구현할 것.
- react-hook-form을 사용하여 구현
 */

import { useForm } from 'react-hook-form'
import EmailInput from '@/components/signInput/EmailInput'
import PasswordInput from '@/components/signInput/PasswordInput'
import { SigninFormValueType } from '@/types/formTypes'
import { emailValidationRules, passwordValidationRules } from '@/utils/formInputValidationRules'
import styles from './SigninForm.module.scss'

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SigninFormValueType>({ mode: 'all' })

  const onSubmit = () => {
    // post request 보내는 코드
    console.log(getValues('email'))
    console.log(getValues('password'))
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
    </form>
  )
}
