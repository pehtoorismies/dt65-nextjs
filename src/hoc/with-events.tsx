import { useQuery } from '@apollo/react-hooks'
import { map } from 'ramda'
import React, { ComponentType } from 'react'
import { ErrorPage } from '../components/error-page'
import { Loader } from '../components/loader'
import { EVENTS_QUERY } from '../gql'
import { EventExtended } from '../types'
import { parseEvent } from '../util/general'

export interface EventProps {
  events: EventExtended[]
  refetchEvents: () => any
}

export const withEvents = <P extends {}>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => (props) => {
  const {
    loading: eventsLoading,
    error: eventsError,
    data: eventsData,
    refetch: refetchEvents,
  } = useQuery(EVENTS_QUERY)

  if (eventsLoading) {
    return <Loader />
  }
  if (eventsError) {
    const refresh = () => window.location.reload()
    return (
      <ErrorPage
        title="Virhe"
        buttonTitle="Lataa uudelleen"
        message="Tapahtumien latauksessa tapahtui virhe"
        onGetMeOut={refresh}
      />
    )
  }

  const { findManyEvents } = eventsData

  const events: EventExtended[] = map(parseEvent, findManyEvents)

  return (
    <WrappedComponent
      events={events}
      refetchEvents={refetchEvents}
      {...props}
    />
  )
}
