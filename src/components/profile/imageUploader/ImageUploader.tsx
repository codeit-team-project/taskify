/* 이미지 파일 업로드 컴포넌트

- Profile 컴포넌트 내부에 들어갈 컴포넌트
*/

import { forwardRef, useEffect, useState } from 'react'
import { ProfileInputProps } from '@/types/formTypes'
import styles from './ImageUploader.module.scss'

const ImageUploader = forwardRef<HTMLInputElement, ProfileInputProps>(
  ({ onChange, name = '', hasError, savedImg, watch, setImgFormData }, ref) => {
    const [preview, setPreview] = useState(savedImg === '' || null || undefined ? null : savedImg)
    const previewWatcher = watch('image')
    const formData = new FormData()

    // profile img 미리보기 코드
    useEffect(() => {
      if (previewWatcher && previewWatcher.length > 0) {
        const file = previewWatcher[0]
        file && formData.append('img', file)
        const tempUrl = URL.createObjectURL(file)
        setPreview(tempUrl)
        setImgFormData(formData)
      }
      return () => {
        if (typeof window !== 'undefined') {
          if (preview) {
            URL.revokeObjectURL(preview)
            setPreview(null)
          }
        }
      }
      // BUG - dependency에 preview를 넣으면 무한렌더링이 되는데 왜 그런지 모르겠습니다..
    }, [previewWatcher, name])

    return (
      <div className={styles['input-container']}>
        <label htmlFor={name}>
          <div>{preview && <img src={preview} alt="thumbnail img" />}</div>
        </label>
        <input id={name} ref={ref} name={name} type="file" onChange={onChange} accept="image/*" />
      </div>
    )
  },
)

ImageUploader.displayName = 'ImageUploader'

export default ImageUploader
