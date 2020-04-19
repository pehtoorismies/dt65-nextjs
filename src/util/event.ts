import { find, propEq } from 'ramda'

import { EventType, EventTypeDescriptor } from '../types'

const toApiType = (
  eventType: EventType,
  events: EventTypeDescriptor[]
): string => {
  const type: EventTypeDescriptor = find(propEq('id', eventType))(events)
  return type.apiType
}

const fromEventType = (
  eventType: EventType,
  events: EventTypeDescriptor[]
): EventTypeDescriptor => {
  return find(propEq('id', eventType))(events)
}

const fromApiType = (
  apiType: string,
  events: EventTypeDescriptor[]
): EventTypeDescriptor => {
  return find(propEq('apiType', apiType))(events)
}

export { fromApiType, toApiType, fromEventType }
