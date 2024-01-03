import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

export const getFormattedDate = (
  dateDB: string,
): {
  day: string
  date: string
} => {
  dayjs.extend(relativeTime)
  const receivedDate = dayjs(dateDB).locale(ru)

  const dayOfTheWeek = receivedDate.format('dddd')
  const monthDate = receivedDate.date()
  const monthOfYear = receivedDate.month()
  const year = receivedDate.year()
  const hour = receivedDate.hour()
  const minute = receivedDate.minute()

  const customMonths = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  let formattedMonth = '[месяц]'

  for (let i = 0; i < customMonths.length; i++) {
    if (monthOfYear === i) {
      formattedMonth = customMonths[i]
    }
  }

  const detailsDate = `${monthDate} ${formattedMonth} ${year} года`
  const timeSinceInception = dayjs(dateDB).locale(ru).fromNow()

  const detailsDayCreation = `${timeSinceInception}, ${hour}:${minute},`
  const detailsDateCreation = `${detailsDate} `

  return { day: detailsDayCreation, date: detailsDateCreation }
}
