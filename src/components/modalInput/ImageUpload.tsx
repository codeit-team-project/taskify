import React, { useContext, useEffect } from 'react'
import styles from '@/components/modalInput/ImageUpload.module.scss'
import Image from 'next/image'
import plus from '../../../public/assets/images/plusImage.svg'
import { FormContext } from '@/context/formContext'

export default function ImageUpload({ EditImageUrl = '' }) {
  const { setImageUrl, preview, setPreview } = useContext(FormContext)

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

  useEffect(() => {
    if (EditImageUrl.length > 0) {
      setImageUrl(EditImageUrl)
      setPreview(EditImageUrl)
    }
  }, [])
  return (
    <div className={styles['container']}>
      <span className={styles['target']}>이미지</span>
      <label htmlFor="file">
        {preview ? (
          <Image src={preview} alt="preview" className={styles['preview']} width={30} height={30} />
        ) : (
          <div className={styles['fileUpload']}>
            <Image src={plus} alt="plus" className={styles['plus']} />
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
