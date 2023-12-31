/* 이미지 파일 업로드 컴포넌트

- Profile 컴포넌트 내부에 들어갈 컴포넌트
*/

import { forwardRef, useEffect, useState } from 'react'
import Image from 'next/image'

import { ProfileInputProps } from '@/types/formTypes'
import styles from './ImageUploader.module.scss'

const ImageUploader = forwardRef<HTMLInputElement, ProfileInputProps>(
  ({ onChange, name = '', savedImg, watch }, ref) => {
    const [preview, setPreview] = useState(savedImg)
    const previewWatcher = watch('image')

    // profile img 미리보기 코드
    useEffect(() => {
      if (previewWatcher && previewWatcher.length > 0) {
        const file = previewWatcher[0]
        const tempUrl = URL.createObjectURL(file)
        setPreview(tempUrl)
      }
      return () => {
        if (typeof window !== 'undefined') {
          if (preview) {
            URL.revokeObjectURL(preview)
          }
          setPreview(savedImg)
        }
      }
      // BUG - dependency에 preview를 넣으면 무한렌더링이 되는데 왜 그런지 모르겠습니다..
    }, [previewWatcher, name])

    return (
      <div className={styles['input-container']}>
        <label htmlFor={name} className={styles['label-container']}>
          <Image src={preview ?? '/assets/no-profile2.png'} alt="thumbnail img" layout="fill" />
        </label>
        <input id={name} ref={ref} name={name} type="file" onChange={onChange} accept="image/*" />
      </div>
    )
  },
)

ImageUploader.displayName = 'ImageUploader'

export default ImageUploader