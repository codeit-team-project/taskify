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
    return '#C4B1A2'
  } else if (letterAscii <= 75) {
    return '#9DD7ED'
  } else if (letterAscii <= 80) {
    return '#FDD446'
  } else if (letterAscii <= 85) {
    return '#FFC85A'
  } else {
    return '#A3C4A2'
  }
}

export default function RandomProfile({ size, email }: RandomProfileProps) {
  const bigLetter = email[0].toUpperCase()
  const colorHexCode = selectColor(bigLetter)

  return (
    <EllipseIcon size={size} color={colorHexCode}>
      <text
        id="text"
        fill="#ffffff"
        fontSize={size / 2}
        fontWeight="700"
        alignmentBaseline="middle"
        textAnchor="middle"
        x={size / 2 + 1}
        y={size / 2 + 1}
      >
        {bigLetter}
      </text>
    </EllipseIcon>
  )
}
