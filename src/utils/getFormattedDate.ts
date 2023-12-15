export const getFormattedDate = (dateDB: string): string => {
  const months = [
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

  const d = new Date(dateDB)

  const date = d.getDate()
  const month = d.getMonth()
  const year = d.getFullYear()

  let formattedMonth = '[месяц]'

  for (let i = 0; i < months.length; i++) {
    if (i === month) {
      formattedMonth = months[i]
    }
  }

  const newDate = `${date} ${formattedMonth} ${year} года`

  return newDate
}
