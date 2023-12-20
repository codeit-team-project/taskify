/* Signin, Signup 페이지에 들어갈 인풋 컴포넌트
 */

import Image from 'next/image'
import React, { forwardRef, useState } from 'react'
import { ChangeHandler, FieldErrors } from 'react-hook-form'
import SigninFormValueType from '@/types/SigninFormValueType'
import styles from './SignInput.module.scss'

interface SignInputProps {
  id: string
  iType: string
  placeholder: string
  labelName: string
  onChange?: ChangeHandler
  onBlur?: ChangeHandler
  name?: string
  hasError?: {} | FieldErrors<SigninFormValueType>
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>(
  (
    {
      id = '',
      iType = 'text',
      placeholder = '',
      labelName = '',
      onChange,
      onBlur,
      name = '',
      hasError = {},
    },
    ref,
  ) => {
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
