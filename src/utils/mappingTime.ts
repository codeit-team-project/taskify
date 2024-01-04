import { format } from 'date-fns'

export const fnsTimeFormat = (date: string) => {
  const removeTimeGMTZero = date.slice(0, -1)
  const dateObject = new Date(removeTimeGMTZero)
  return format(dateObject, 'yyyy-MM-dd HH:mm')
}
