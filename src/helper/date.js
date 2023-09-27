import dayjs from 'dayjs'

const fullTime = (date) => {
  if (!date) return '-'
  return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
}

const dayMonthYear = (date) => {
  if (!date) return '-'
  return dayjs(date).format('DD-MM-YYYY')
}

export default { fullTime, dayMonthYear }
