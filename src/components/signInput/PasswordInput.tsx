/* 비밀번호 값을 받는 인풋

- signpage에 사용하는 비밀번호 인풋.
- id, placeholder, labelName 을 인자로 받음.
- hasError 은 상위 컴포넌트로부터 errors 객체를 받아옴.
- 나머지 인자인 onChange, onBlur, name은 상위 컴포넌트로부터 register 객체를 받아옴.
*/

import Image from 'next/image'
import { forwardRef, useState } from 'react'
import { SignInputProps } from '@/types/formTypes'
import styles from './SignInput.module.scss'

const PasswordInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ id, placeholder, labelName, onChange, onBlur, name, hasError }, ref) => {
    const [currentType, setCurrentType] = useState('password')
    const [isOpenEye, setIsOpenEye] = useState(false)

    const handleClickEye = () => {
      setCurrentType(currentType === 'text' ? 'password' : 'text')
      setIsOpenEye(!isOpenEye)
    }

    return (
      <div className={styles['input-container']}>
        <label htmlFor={id} className={styles['label']}>
          {labelName}
        </label>
        <button onClick={handleClickEye} className={styles['eye-button']} type="button">
          <Image
            src={isOpenEye ? 'assets/images/openEye.svg' : 'assets/images/closeEye.svg'}
            alt=""
            width={24}
            height={24}
          />
        </button>
        <input
          id={id}
          ref={ref}
          name={name}
          type={currentType}
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
PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
