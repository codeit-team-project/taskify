/* 이메일 값을 받는 인풋

- signpage에 사용하는 이메일 인풋.
- id, placeholder, labelName 을 인자로 받음.
- hasError 은 상위 컴포넌트로부터 errors 객체를 받아옴.
- 나머지 인자인 onChange, onBlur, name은 상위 컴포넌트로부터 register 객체를 받아옴.
*/

import { forwardRef } from 'react'
import { SignInputProps } from '@/types/formTypes'
import styles from './SignInput.module.scss'

const EmailInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ id, placeholder, labelName, onChange, onBlur, name, hasError }, ref) => {
    return (
      <div className={styles['input-container']}>
        <label htmlFor={id} className={styles['label']}>
          {labelName}
        </label>
        <input
          id={id}
          ref={ref}
          name={name}
          type="text"
          placeholder={placeholder}
          className={styles['input']}
          onChange={onChange}
          onBlur={onBlur}
          data-error={hasError === undefined || !Object.keys(hasError).includes(id) ? false : true}
        />
      </div>
    )
  },
)
EmailInput.displayName = 'EmailInput'

export default EmailInput
