import format from 'date-fns/format'
import { endOfDay, startOfDay } from 'date-fns/fp'
import parseISO from 'date-fns/parseISO'
import { defaultTo, equals, filter, findIndex, nth, pipe, split } from 'ramda'
import { isNull, isUndefined } from 'ramda-adjunct'
import { EVENTS_PATH, EVENT_TYPES, ROUTES } from '../constants'
import {
  ICalEvent,
  IEventExtended,
  IEventResp,
  IEventState,
  ISubject,
} from '../types'
import { fromApiType } from './event'
import { dateToFinnish, dateToTime } from './time'

const isNullOrUndefined = <T>(a: T) => isNull(a) || isUndefined(a)

const isParticipant = (user: ISubject, participants: ISubject[]) => {
  return (
    findIndex((p: ISubject) => {
      return user.sub === p.sub
    })(participants || []) >= 0
  )
}

const parseEvent = (evt: IEventResp): IEventExtended => {
  const date = parseISO(evt.date)
  const time = evt.exactTime ? format(date, 'HH:mm') : ''

  return {
    ...evt,
    time,
    creator: evt.creator.nickname,
    date: dateToFinnish(date),
    type: fromApiType(evt.type, EVENT_TYPES),
    isoDate: evt.date,
  }
}

const formatICalEvent = (evt: IEventExtended): ICalEvent => {
  const date = parseISO(evt.isoDate)

  return {
    date,
    type: evt.type.id,
  }
}

const toEventState = (evt: IEventResp): IEventState => {
  const date = parseISO(evt.date)
  return {
    date,
    description: evt.description,
    creatorJoining: false,
    participants: evt.participants,
    race: evt.race,
    subtitle: evt.subtitle,
    time: dateToTime(date, evt.exactTime),
    timeEnabled: !!evt.exactTime,
    title: evt.title,
    type: fromApiType(evt.type, EVENT_TYPES).id,
  }
}

const filterByDate = (
  events: IEventExtended[],
  date?: Date
): IEventExtended[] => {
  if (!date) {
    return events
  }

  const start = startOfDay(date).getTime()
  const end = endOfDay(date).getTime()

  const dateFilter = (e: IEventExtended): boolean => {
    const eventDate = parseISO(e.isoDate).getTime()
    return eventDate >= start && eventDate <= end
  }

  return filter(dateFilter, events)
}

const TITLES = {
  [ROUTES.home]: 'tapahtumat',
  [ROUTES.calendar]: 'kalenteri',
  [ROUTES.createEvent]: 'luo',
  [ROUTES.profile]: 'asetukset',
  [ROUTES.viewEvent]: 'tapahtuma',
  [ROUTES.editEvent]: 'muokkaa',
  [ROUTES.preferences]: 'tilaukset',
  [ROUTES.profileInfo]: 'profiili',
  [ROUTES.userList]: 'käyttäjät',
  [ROUTES.login]: 'kirjaudu',
  [ROUTES.forgotPassword]: 'salasana',
  [ROUTES.register]: 'rekisteröidy',
  [ROUTES.register]: 'success',
}

const isEdit = pipe(defaultTo('//'), split('/'), nth(2), equals('edit'))

const getPageHeader = (loc: string): string => {
  if (loc.startsWith(EVENTS_PATH)) {
    return isEdit(loc) ? 'edit' : 'tapahtuma'
  }

  return TITLES[loc] || ''
}

export {
  isNullOrUndefined,
  isParticipant,
  filterByDate,
  parseEvent,
  toEventState,
  formatICalEvent,
  getPageHeader,
}
