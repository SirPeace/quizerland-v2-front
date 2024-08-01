interface GetFormattedDateReturn {
  day: string
  date: string
}
export function getFormattedDate(rawDate: string): GetFormattedDateReturn {
  return { day: '12', date: 'january' }
}
