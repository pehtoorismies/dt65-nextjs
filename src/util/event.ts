import { find, propEq } from 'ramda';

import { EventType, IEventTypeDescriptor } from '../types';

const toApiType = (
  evtType: EventType,
  events: IEventTypeDescriptor[]
): string => {
  const eType: IEventTypeDescriptor = find(propEq('id', evtType))(events);
  return eType.apiType;
};

const fromEventType = (
  e: EventType,
  events: IEventTypeDescriptor[]
): IEventTypeDescriptor => {
  return find(propEq('id', e))(events);
};

const fromApiType = (
  apiType: string,
  events: IEventTypeDescriptor[]
): IEventTypeDescriptor => {
  return find(propEq('apiType', apiType))(events);
};

export { fromApiType, toApiType, fromEventType };
