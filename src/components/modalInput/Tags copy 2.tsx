// import React, { useContext } from 'react'
// import styles from '@/components/modalInput/Tags.module.scss'
// import { KeyboardEvent } from 'react'
// import { FormContext } from '@/context/formContext'

// export default function Tags() {
//   const { tags, setTags } = useContext(FormContext)

//   const colorArr = ['orange', 'blue', 'green', 'pink']

//   const handleTags = () => {
//     setTags(tags)
//   }

//   // const handleAdd = (e: KeyboardEvent<HTMLInputElement>) => {
//   //   const inputValue = e.currentTarget.value
//   //   if (e.key === 'Enter' && inputValue !== '' && !tags.includes(inputValue)) {
//   //     const randomNum = Math.floor(Math.random() * 4)
//   //     setTags((prev) => [...prev, { name: inputValue, color: colorArr[randomNum] }])
//   //     e.currentTarget.value = ''
//   //   }
//   // }

//   console.log(tags)
//   const handleDelete = (deleteIndex: number) => {
//     setTags(tags.filter((_, index) => index !== deleteIndex))
//   }

//   return (
//     <div className={styles.container}>
//       <span className={styles.text}>태그</span>
//       <div className={styles.contents}>
//         <ul>
//           {tags.map((tag, index) => (
//             <li key={index}>
//               <span className={tag.color ? styles[tag.color] : ''}>{tag.name}</span>
//               <span onClick={() => handleDelete(index)}>x</span>
//             </li>
//           ))}
//         </ul>
//         <input onKeyDown={handleAdd} onChange={handleTags} />
//       </div>
//     </div>
//   )
// }
//   const handleAdd = (e: KeyboardEvent<HTMLInputElement>) => {
//     const inputValue = e.currentTarget.value
//     if (e.key === 'Enter' && inputValue !== '' && !tags.includes(inputValue)) {
//       const randomNum = Math.floor(Math.random() * 4)
//       setTags((prev) => [
//         ...prev,
//         {
//           inputValue: {
//             name: inputValue,
//             color: colorArr[randomNum],
//           },
//         },
//       ])
//       e.currentTarget.value = ''
//     }
//   }
