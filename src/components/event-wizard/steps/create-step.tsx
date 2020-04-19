import React from 'react'
import Switch from 'react-switch'
import { Flex, Text } from 'rebass'
import { EVENT_TYPES } from '../../../constants'
import { EventState, EventStep, LocalUser } from '../../../types'
import { dateToFinnish, fromEventType, timeToString } from '../../../util'
import { LeftArrowButton, RightArrowButton } from '../../common'
import { EventCard } from '../../event-card'
import { BaseStep } from './base-step'

interface Props extends EventStep {
  nickname: string
  eventState: EventState
  joinCreator: () => void
  isEdit: boolean
}

export const CreateStep = ({
  toPrevStep,
  toNextStep,
  nickname,
  eventState,
  joinCreator,
  isEdit,
}: Props) => {
  const temporaryUser: LocalUser = {
    sub: '1',
    nickname,
    picture: 'empty',
    name: 'dummy',
  }

  const participants = eventState.creatorJoining
    ? [{ id: '1', sub: '1', nickname }]
    : []
  if (!eventState.type) {
    throw new Error('Eventtype not defined')
  }
  const type = fromEventType(eventState.type, EVENT_TYPES)
  const orgParticipants = eventState.participants || []
  const submitText = isEdit ? 'Muokkaa' : 'Luo'

  const previewEvent = {
    ...eventState,
    id: 0,
    time: eventState.timeEnabled ? timeToString(eventState.time) : '',
    participants: isEdit ? orgParticipants : participants,
    type,
    race: eventState.race || false,
    title: eventState.title || 'empty',
    date: dateToFinnish(eventState.date || new Date()),
  }

  const iamJoining = isEdit ? null : (
    <Flex pt={2} alignItems="center" justifyContent="center">
      <Flex alignItems="center" justifyContent="center">
        <Text mr={2}>Osallistun itse?</Text>
        <Switch onChange={joinCreator} checked={eventState.creatorJoining} />
      </Flex>
    </Flex>
  )

  return (
    <BaseStep title="Esikatsele">
      <Flex flexDirection="column" alignItems="center" width="100%">
        <EventCard
          stayOpened={true}
          {...previewEvent}
          user={temporaryUser}
          creator={temporaryUser.nickname}
        />
        {iamJoining}
      </Flex>
      <Flex
        my={1}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <LeftArrowButton onClick={toPrevStep} visible={true} />
        <RightArrowButton
          text={submitText}
          onClick={toNextStep}
          visible={true}
        />
      </Flex>
    </BaseStep>
  )
}
