import {
  queryParamsFrom,
  routeFromQueryString,
  dateFromQueryFilter,
} from '../query';
import { QUERY_PARAMS, ROUTES } from '../../constants';

test('queryParamsFrom', () => {
  expect(queryParamsFrom('koira')).toBe('from=koira');
  expect(queryParamsFrom('')).toBe('from=');
});

test('routeFromQueryString', () => {
  expect(
    routeFromQueryString(`?from=${QUERY_PARAMS.VALUES.FROM.VIEW}`, '12')
  ).toBe(`/events/12`);
});

test('dateFromQueryFilter', () => {
  const d = dateFromQueryFilter('?datefilter=2020-01-12');

  if (d === undefined) {
    fail();
    return;
  }
  expect(d.getFullYear()).toBe(2020);
  expect(d.getMonth()).toBe(0);
  expect(d.getDate()).toBe(12);
});
