export const mappingTime = (date: string) => {
  const dateObject = new Date(date)
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1
  const day = dateObject.getDay()
  const hour = ('0' + dateObject.getHours()).slice(-2)
  const minutes = ('0' + dateObject.getMinutes()).slice(-2)
  return {
    year,
    month,
    day,
    hour,
    minutes,
  }
}
