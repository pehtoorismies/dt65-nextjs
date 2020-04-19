import format from 'date-fns/format'
import { setHours, setMinutes } from 'date-fns/fp'
import getHours from 'date-fns/getHours'
import getMinutes from 'date-fns/getMinutes'
import { fi } from 'date-fns/locale'
import parseISO from 'date-fns/parseISO'
import { compose } from 'ramda'
import { Time } from '../types'

const DEFAULT_TIME = { minute: 0, hour: 0 }

const zeroPad = (n: number) => {
  const fill = n < 10 ? '0' : ''
  return `${fill}${n}`
}

const timeToString = (time: Time): string => {
  if (time.hour > 24 || time.minute > 59) {
    return '00:00'
  }
  const m: string = zeroPad(time.minute)
  const h: string = zeroPad(time.hour)
  return `${h}:${m}`
}

const dateToTime = (date: Date, exactTime: boolean): Time => {
  if (!exactTime) {
    return DEFAULT_TIME
  }

  return { minute: getMinutes(date), hour: getHours(date) }
}

const toDate = (date: string, time?: Time): Date => {
  const d = parseISO(date)
  if (!time) {
    return d
  }
  const { minute, hour } = time
  const updated = compose(setHours(hour), setMinutes(minute))(d)
  return updated
}

const dateToISOString = (date: Date, time?: Time): string => {
  if (!time) {
    return date.toISOString()
  }

  const { minute, hour } = time
  const updated: Date = compose(setHours(hour), setMinutes(minute))(date)

  return updated.toISOString()
}

const dateToFinnish = (date: Date): string =>
  format(date, 'dd.MM.yyyy (EEEEEE)', { locale: fi })

export { timeToString, toDate, dateToTime, dateToFinnish, dateToISOString }
