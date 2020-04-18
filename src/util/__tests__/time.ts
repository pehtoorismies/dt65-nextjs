import { timeToString, toDate, dateToTime } from '../time';

test('timeToString', () => {
  expect(timeToString({ hour: 0, minute: 0 })).toBe('00:00');
  expect(timeToString({ hour: 12, minute: 10 })).toBe('12:10');
  expect(timeToString({ hour: 1, minute: 59 })).toBe('01:59');
  // wrongs
  expect(timeToString({ hour: 25, minute: 120 })).toBe('00:00');
  expect(timeToString({ hour: 23, minute: 60 })).toBe('00:00');
});

test('toDate', () => {
  const toDate2011 = toDate('2011-10-05T14:48:00.000Z');
  expect(toDate2011.getFullYear()).toBe(2011);
  expect(toDate2011.getMonth()).toBe(9);
  expect(toDate2011.getDate()).toBe(5);
  expect(toDate2011.getHours()).toBe(14);
  expect(toDate2011.getMinutes()).toBe(48);

  const toDate2013 = toDate('2013-11-02T14:48:00.000Z', {
    hour: 15,
    minute: 21,
  });
  expect(toDate2013.getFullYear()).toBe(2013);
  expect(toDate2013.getMonth()).toBe(10);
  expect(toDate2013.getDate()).toBe(2);
  expect(toDate2013.getHours()).toBe(15);
  expect(toDate2013.getMinutes()).toBe(21);
});

test('dateToTime', () => {
  const d = new Date(2011, 9, 7, 13, 5);

  expect(dateToTime(d, false).hour).toBe(0);
  expect(dateToTime(d, false).minute).toBe(0);
  expect(dateToTime(d, true).hour).toBe(13);
  expect(dateToTime(d, true).minute).toBe(5);
});
