/* Signin, Signup 페이지에 들어갈 인풋 컴포넌트
 */

import Image from 'next/image'
import { forwardRef, useState } from 'react'
import { SignInputProps } from '@/types/formTypes'
import styles from './SignInput.module.scss'

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  ({ id, iType, placeholder, labelName, onChange, onBlur, name, hasError }, ref) => {
    const [changeType, setChangeType] = useState(iType)
    const [isOpenEye, setIsOpenEye] = useState(false)

    const handleClickEye = () => {
      setChangeType(changeType === 'text' ? 'password' : 'text')
      setIsOpenEye(!isOpenEye)
    }

    return (
      <div className={styles['input-container']}>
        <label htmlFor={id} className={styles['label']}>
          {labelName}
        </label>
        {iType === 'password' && (
          <button onClick={handleClickEye} className={styles['eye-button']} type="button">
            <Image
              src={isOpenEye ? 'assets/images/openEye.svg' : 'assets/images/closeEye.svg'}
              alt=""
              width={24}
              height={24}
            />
          </button>
        )}
        <input
          id={id}
          ref={ref}
          name={name}
          type={changeType}
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
SignInput.displayName = 'SignInput'

export default SignInput
