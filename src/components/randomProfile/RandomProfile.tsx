/* profileImageUrl 이 null일 경우 보여주는 임시 랜덤 프로필 이미지

- 인자로 width와 height를 number 형으로 받음.
- 임의의 배경색이 지정되었고 가운데에 이메일 첫글자가 들어간 svg를 리턴.
*/

import EllipseIcon from '../ui/icons/Ellipse'

interface RandomProfileProps {
  size: number
  email: string
}

// 알파벳에 따라 색상 string을 리턴하는 함수
const selectColor = (letter: string) => {
  const letterAscii = letter.charCodeAt(0)
  if (letterAscii <= 70) {
    return '#7AC555'
  } else if (letterAscii <= 75) {
    return '#760DDE'
  } else if (letterAscii <= 80) {
    return '#FFA500'
  } else if (letterAscii <= 85) {
    return '#76A5EA'
  } else {
    return '#E876EA'
  }
}

export default function RandomProfile({ size, email }: RandomProfileProps) {
  const bigLetter = email[0].toUpperCase()
  const colorHexCode = selectColor(bigLetter)

  return (
    <div>
      <EllipseIcon size={size} color={colorHexCode}>
        <text
          id="text"
          fill="#ffffff"
          font-size={size / 2}
          font-weight="700"
          alignment-baseline="middle"
          text-anchor="middle"
          x={size / 2}
          y={size / 2}
        >
          {bigLetter}
        </text>
      </EllipseIcon>
    </div>
  )
}
