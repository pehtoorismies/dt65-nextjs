import { fromApiType, toApiType, fromEventType } from '../event';
import { EventType } from '../../types';
import { EVENT_TYPES } from '../../constants';

test('fromApiType', () => {
  const karonkka = fromApiType('Karonkka', EVENT_TYPES);
  expect(karonkka.apiType).toBe('Karonkka');
  expect(karonkka.defaultImage).toBe('events-karonkka.jpg');
  expect(karonkka.id).toBe(EventType.Karonkka);
  expect(karonkka.title).toBe('Karonkka');

  const orienteering = fromApiType('Orienteering', EVENT_TYPES);
  expect(orienteering.apiType).toBe('Orienteering');
  expect(orienteering.defaultImage).toBe('events-orienteering.jpg');
  expect(orienteering.id).toBe(EventType.Orienteering);
  expect(orienteering.title).toBe('Suunnistus');
});

test('toApiType', () => {
  const karonkka = toApiType(EventType.Karonkka, EVENT_TYPES);
  expect(karonkka).toBe('Karonkka');
  const other = toApiType(EventType.Other, EVENT_TYPES);
  expect(other).toBe('Other');
});

test('fromEventType', () => {
  const evt = fromEventType(EventType.Cycling, EVENT_TYPES);
  expect(evt.title).toBe('Pyöräily');

});
