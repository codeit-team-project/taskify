/* 이미지 파일 업로드 컴포넌트

- Profile 컴포넌트 내부에 들어갈 컴포넌트
*/

import { forwardRef, useEffect, useState } from 'react'
import { ProfileInputProps } from '@/types/formTypes'
import styles from './ImageUploader.module.scss'

const ImageUploader = forwardRef<HTMLInputElement, ProfileInputProps>(
  ({ onChange, name = '', hasError, savedImg, watch, setImgUrl }, ref) => {
    const previewWatcher = watch('image')
    const [preview, setPreview] = useState(savedImg ? savedImg : '/assets/addIcon.svg')

    // profile img 미리보기
    useEffect(() => {
      if (ref) {
        if (previewWatcher && previewWatcher.length > 0) {
          console.log(previewWatcher)
          const file = previewWatcher[0]
          const tempUrl = URL.createObjectURL(file)
          // BUG - 왜 안되는건지 도저히 모르겠습니다.. help ㅠㅠ
          console.log(tempUrl)
          setPreview(tempUrl)
          setImgUrl(tempUrl.slice(5))
        }
        return () => {
          if (typeof window !== 'undefined') {
            setPreview('')
            window.URL.revokeObjectURL(preview)
          }
        }
      }
    }, [previewWatcher])

    return (
      <div className={styles['input-container']}>
        <label htmlFor={name}>
          <div>
            <img src={`${preview}`} alt="thumbnail img" />
          </div>
        </label>
        <input id={name} ref={ref} name={name} type="file" onChange={onChange} accept="image/*" />
      </div>
    )
  },
)

ImageUploader.displayName = 'ImageUploader'

export default ImageUploader
