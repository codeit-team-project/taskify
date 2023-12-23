import React, { useContext, useState } from 'react'
import styles from '@/components/modalInput/ImageUpload.module.scss'
import Image from 'next/image'
import plus from '../../../public/assets/plusImage.svg'
import { FormContext } from '@/context/formContext'

export default function ImageUpload() {
  const { imageUrl, setImageUrl } = useContext(FormContext)
  const [preview, setPreview] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const fileReader = new FileReader()
      setImageUrl(file)
      fileReader.onload = (event) => {
        const content = event.target!.result?.toString()!
        setPreview(content)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <div className={styles.container}>
      <span className={styles.text}>이미지</span>

      <label htmlFor="file">
        {preview ? (
          // 얘 Image로 바꾸면에러놤 와이어쨰서
          <img src={preview} alt="preview" className={styles.preview} />
        ) : (
          <div className={styles.fileUpload}>
            <Image src={plus} alt="plus" className={styles.plus} />
          </div>
        )}
      </label>
      <input
        type="file"
        id="file"
        name="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />
    </div>
  )
}
