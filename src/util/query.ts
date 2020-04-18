import parseISO from 'date-fns/parseISO';
import qs from 'qs';
import { path, prop, replace } from 'ramda';

import { QUERY_PARAMS, ROUTES } from '../constants';

const queryParamsFrom = (fromValue: string): string =>
  `${QUERY_PARAMS.KEYS.FROM}=${fromValue}`;

const routeFromQueryString = (
  queryString: string,
  eventId?: string
): string => {
  const params = qs.parse(queryString, { ignoreQueryPrefix: true });
  const val = prop(QUERY_PARAMS.KEYS.FROM, params);

  if (val === QUERY_PARAMS.VALUES.FROM.HOME) {
    return ROUTES.home;
  }
  if (val === QUERY_PARAMS.VALUES.FROM.VIEW) {
    return replace(/:id/g, String(eventId), ROUTES.viewEvent);
  }
  return ROUTES.home;
};

const dateFromQueryFilter = (queryString: string): Date | undefined => {
  const params = qs.parse(queryString, { ignoreQueryPrefix: true });

  const dateString: string | undefined = path(['datefilter'], params);
  if (!dateString) {
    return;
  }

  return parseISO(dateString);
};

export { queryParamsFrom, routeFromQueryString, dateFromQueryFilter };
