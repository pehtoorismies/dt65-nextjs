import format from 'date-fns/format'
import { endOfDay, startOfDay } from 'date-fns/fp'
import parseISO from 'date-fns/parseISO'
import { defaultTo, equals, filter, findIndex, nth, pipe, split } from 'ramda'
import { isNull, isUndefined } from 'ramda-adjunct'
import { EVENTS_PATH, EVENT_TYPES, ROUTES } from '../constants'
import {
  CalEvent,
  EventExtended,
  EventResp,
  EventState,
  Subject,
} from '../types'
import { fromApiType } from './event'
import { dateToFinnish, dateToTime } from './time'

const isNullOrUndefined = <T>(a: T) => isNull(a) || isUndefined(a)

const isParticipant = (user: Subject, participants: Subject[]) => {
  return (
    findIndex((p: Subject) => {
      return user.sub === p.sub
    })(participants || []) >= 0
  )
}

const parseEvent = (eventResponse: EventResp): EventExtended => {
  const date = parseISO(eventResponse.date)
  const time = eventResponse.exactTime ? format(date, 'HH:mm') : ''

  return {
    ...eventResponse,
    time,
    creator: eventResponse.creator.nickname,
    date: dateToFinnish(date),
    type: fromApiType(eventResponse.type, EVENT_TYPES),
    isoDate: eventResponse.date,
  }
}

const formatICalEvent = (event: EventExtended): CalEvent => {
  const date = parseISO(event.isoDate)

  return {
    date,
    type: event.type.id,
  }
}

const toEventState = (event: EventResp): EventState => {
  const date = parseISO(event.date)
  return {
    date,
    description: event.description,
    creatorJoining: false,
    participants: event.participants,
    race: event.race,
    subtitle: event.subtitle,
    time: dateToTime(date, event.exactTime),
    timeEnabled: !!event.exactTime,
    title: event.title,
    type: fromApiType(event.type, EVENT_TYPES).id,
  }
}

const filterByDate = (
  events: EventExtended[],
  date?: Date
): EventExtended[] => {
  if (!date) {
    return events
  }

  const start = startOfDay(date).getTime()
  const end = endOfDay(date).getTime()

  const dateFilter = (event: EventExtended): boolean => {
    const eventDate = parseISO(event.isoDate).getTime()
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

type IsEdit = (value: string) => boolean

const isEdit: IsEdit = pipe(defaultTo('//'), split('/'), nth(2), equals('edit'))

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
