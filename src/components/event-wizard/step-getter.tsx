import { assoc } from 'ramda'
import React from 'react'
import { EVENT_TYPES } from '../../constants'
import { EventType, EventState, Time } from '../../types'
import { isNullOrUndefined } from '../../util/general'
import {
  CreateStep,
  DateStep,
  DescriptionStep,
  RaceStep,
  TimeStep,
  TitleStep,
  TypeStep,
} from './steps'

const STEPS = {
  TYPE: 0,
  RACE: 1,
  TITLE: 2,
  DATE: 3,
  TIME: 4,
  DESCRIPTION: 5,
  PREVIEW: 6,
}

export const getStep = (
  step: number,
  setStep: (step: number) => void,
  eventState: EventState,
  setEventState: (eventState: EventState) => void,
  create: () => void,
  nickname: string,
  isEdit: boolean
) => {
  const setType = (eventType: EventType) => {
    if (!eventState.type) {
      setStep(1)
    }
    setEventState(assoc('type', eventType, eventState))
  }
  const setRace = (isRace: boolean) => {
    if (isNullOrUndefined(eventState.race)) {
      setStep(2)
    }
    setEventState(assoc('race', isRace, eventState))
  }
  const setTitles = (title?: string, subtitle?: string) => {
    setEventState(
      assoc('subtitle', subtitle, { ...eventState, title, subtitle })
    )
  }

  const setDate = (date: Date): void => {
    setEventState(assoc('date', date, eventState))
  }
  const setTime = (time: Time): void => {
    setEventState(assoc('time', time, eventState))
  }
  const setTimeEnabled = (timeEnabled: boolean): void => {
    setEventState(assoc('timeEnabled', timeEnabled, eventState))
  }

  const setDescription = (description?: string) => {
    setEventState(assoc('description', description, eventState))
  }
  const toggleCreatorJoining = () => {
    const toggler = !eventState.creatorJoining
    setEventState(assoc('creatorJoining', toggler, eventState))
  }

  const toNext = (currentStep: number) => () => {
    setStep(currentStep + 1)
  }
  const toPrevious = (currentStep: number) => () => {
    setStep(currentStep - 1)
  }

  if (step === STEPS.TYPE) {
    return (
      <TypeStep
        setSelectedType={setType}
        selectedType={eventState.type}
        types={EVENT_TYPES}
        toNextStep={toNext(STEPS.TYPE)}
        toPrevStep={toPrevious(STEPS.TYPE)}
      />
    )
  }

  if (step === STEPS.RACE) {
    return (
      <RaceStep
        isRace={eventState.race}
        setRace={setRace}
        toNextStep={toNext(STEPS.RACE)}
        toPrevStep={toPrevious(STEPS.RACE)}
      />
    )
  }
  if (step === STEPS.TITLE) {
    return (
      <TitleStep
        title={eventState.title}
        subtitle={eventState.subtitle}
        setTitles={setTitles}
        toNextStep={toNext(STEPS.TITLE)}
        toPrevStep={toPrevious(STEPS.TITLE)}
      />
    )
  }

  if (step === STEPS.DATE) {
    return (
      <DateStep
        date={eventState.date}
        setDate={setDate}
        toNextStep={toNext(STEPS.DATE)}
        toPrevStep={toPrevious(STEPS.DATE)}
      />
    )
  }

  if (step === STEPS.TIME) {
    return (
      <TimeStep
        time={eventState.time}
        setTime={setTime}
        timeEnabled={eventState.timeEnabled}
        setTimeEnabled={setTimeEnabled}
        toNextStep={toNext(STEPS.TIME)}
        toPrevStep={toPrevious(STEPS.TIME)}
      />
    )
  }

  if (step === STEPS.DESCRIPTION) {
    return (
      <DescriptionStep
        description={eventState.description}
        setDescription={setDescription}
        toNextStep={toNext(STEPS.DESCRIPTION)}
        toPrevStep={toPrevious(STEPS.DESCRIPTION)}
      />
    )
  }

  if (step === STEPS.PREVIEW) {
    return (
      <CreateStep
        joinCreator={toggleCreatorJoining}
        nickname={nickname}
        eventState={eventState}
        toNextStep={create}
        toPrevStep={toPrevious(STEPS.PREVIEW)}
        isEdit={isEdit}
      />
    )
  }

  return <h1>END</h1>
}
