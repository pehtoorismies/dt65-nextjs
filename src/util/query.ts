import parseISO from 'date-fns/parseISO'
import qs from 'qs'
import { path, prop, replace } from 'ramda'

import { QUERY_PARAMS, ROUTES } from '../constants'

const queryParametersFrom = (fromValue: string): string =>
  `${QUERY_PARAMS.KEYS.FROM}=${fromValue}`

const routeFromQueryString = (
  queryString: string,
  eventId?: string
): string => {
  const parameters = qs.parse(queryString, { ignoreQueryPrefix: true })
  const value = prop(QUERY_PARAMS.KEYS.FROM, parameters)

  if (value === QUERY_PARAMS.VALUES.FROM.HOME) {
    return ROUTES.home
  }
  if (value === QUERY_PARAMS.VALUES.FROM.VIEW) {
    return replace(/:id/g, String(eventId), ROUTES.viewEvent)
  }
  return ROUTES.home
}

const dateFromQueryFilter = (queryString: string): Date | undefined => {
  const parameters = qs.parse(queryString, { ignoreQueryPrefix: true })

  const dateString: string | undefined = path(['datefilter'], parameters)
  if (!dateString) {
    return
  }

  return parseISO(dateString)
}

export { queryParametersFrom, routeFromQueryString, dateFromQueryFilter }
