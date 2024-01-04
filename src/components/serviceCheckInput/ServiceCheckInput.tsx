/* Signup 페이지에 쓸 이용약관 체크박스 컴포넌트*/

import { ChangeEvent, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

import ModalContainer from '@/components/dashboardModal/ModalContainer'
import styles from './ServiceCheckInput.module.scss'

interface ServiceTermProps {
  onClose: (s: boolean) => void
}

function ServiceTerm({ onClose }: ServiceTermProps) {
  return (
    <div className={styles['term']}>
      <div className={styles['logos']}>
        <Image src="/assets/images/logoLight.svg" alt="" width={30} height={30} />
        <Image src="/assets/images/logoTitleLight.svg" alt="" width={64} height={24} />
      </div>
      <div className={styles['spacing']}></div>
      <div className={styles['term-container']}>
        <h4>제 1조</h4>본 약관은 코드잇 스프린터 1기 2팀이 운영하는 웹사이트 Taskify에서 제공하는
        온라인 서비스를 이용함에 있어 사이버몰과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로
        합니다.
        <br></br>
        <br></br>
        <h4>제 2조</h4> 본 약관에서 사용하는 용어는 다음과 같이 정의한다.
        <br></br>“웹사이트”란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등
        정보통신설비를 이용하여 재화 또는 용역을 거래 할 수 있도록 설정한 가상의 영업장을 말하며,
        아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
        <br></br>“이용자”란 “웹사이트”에 접속하여 서비스를 이용하는 회원 및 비회원을 말합니다.
        <br></br>“회원”이라 함은 “웹사이트”에 개인정보를 제공하여 회원등록을 한 자로서, “웹사이트”의
        정보를 지속적으로 제공받으며, “웹사이트”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를
        말합니다.
        <br></br>“비회원”이라 함은 회원에 가입하지 않고, “웹사이트”이 제공하는 서비스를 이용하는
        자를 말합니다. “ID”라 함은 이용자가 회원가입당시 등록한 사용자 “개인이용문자”를 말합니다.
        <br></br>“멤버십”이라 함은 회원등록을 한 자로서, 별도의 온/오프라인 상에서 추가 서비스를
        제공 받을 수 있는 회원을 말합니다.
        <br></br>
        <br></br>
        <h4>제 3조</h4> 본 약관은 회원가입 화면에 게시하여 공시하며 회사는 사정변경 및 영업상 중요한
        사유가 있을 경우 약관을 변경할 수 있으며 변경된 약관은 공지사항을 통해 공시한다 본 약관 및
        차후 회사사정에 따라 변경된 약관은 이용자에게 공시함으로써 효력을 발생한다.
      </div>
      <div className={styles['bottom']}>
        <button
          onClick={() => {
            onClose(false)
          }}
          className={styles.button}
        >
          확인
        </button>
      </div>
    </div>
  )
}

interface ServiceCheckInputProps {
  setBlank: (s: boolean) => void
}

export default function ServiceChekInput({ setBlank }: ServiceCheckInputProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClickBox = (e: ChangeEvent<HTMLInputElement>) => {
    setBlank(!e.target.checked)
  }

  return (
    <div className={styles['service-term']}>
      <input type="checkbox" onChange={handleClickBox} />
      <button
        type="button"
        id="checkbox"
        onClick={() => setIsOpen(true)}
        className={styles['service-term-button']}
      >
        이용약관
      </button>
      에 동의합니다.
      {isOpen &&
        createPortal(
          <ModalContainer onClose={() => setIsOpen(false)}>
            <ServiceTerm onClose={setIsOpen} />
          </ModalContainer>,
          document.getElementById('modal-root') as HTMLElement,
        )}
    </div>
  )
}
