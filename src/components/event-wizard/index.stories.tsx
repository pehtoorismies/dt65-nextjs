import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { EVENT_TYPES } from '../../constants'
import { IEventState } from '../../types'
import { StepCounter } from './step-counter'
import {
  CreateStep,
  DateStep,
  DescriptionStep,
  RaceStep,
  TimeStep,
  TitleStep,
  TypeStep,
} from './steps'
import { TimeSet } from './steps/time-set'
import { EventWizard } from '.'

export default {
  title: 'EventWizard',
  decorators: [withKnobs, withA11y],
}

export const stepCounter = () => (
  <StepCounter total={number('total', 5)} completed={number('completed', 0)} />
)

export const eventWizard = () => (
  <EventWizard
    applyEvent={action('Create')}
    nickname={text('nickname', 'hundman')}
    onCancel={action('Cancel')}
  />
)

const commonActions = {
  toNextStep: action('Next'),
  toPrevStep: action('Prev'),
}
const eventState: IEventState = {
  race: true,
  description: 'asdasda',
  title: 'Title',
  subtitle: 'sub title',
  timeEnabled: true,
  time: {
    minute: 20,
    hour: 19,
  },
  creatorJoining: false,
  date: new Date(),
  type: EVENT_TYPES[0].id,
}

export const createStep = () => (
  <CreateStep
    isEdit={boolean('isEdit', false)}
    nickname={text('nickname', 'pertti')}
    {...commonActions}
    eventState={eventState}
    joinCreator={action('Toggle')}
  />
)
export const dateStep = () => (
  <DateStep {...commonActions} setDate={action('Set date')} />
)
export const descriptionStep = () => (
  <DescriptionStep
    {...commonActions}
    setDescription={action('Set description')}
  />
)
export const raceStep = () => (
  <RaceStep
    isRace={boolean('isRace', undefined)}
    setRace={action('set')}
    {...commonActions}
  />
)
export const timeStep = () => (
  <TimeStep
    {...commonActions}
    timeEnabled={boolean('timeEnabled', false)}
    setTimeEnabled={action('Enable')}
    setTime={action('Set time')}
  />
)
export const titleStep = () => (
  <TitleStep {...commonActions} setTitles={action('Set titles')} />
)
export const typeStep = () => (
  <TypeStep
    setSelectedType={action('Select')}
    types={EVENT_TYPES}
    selectedType={EVENT_TYPES[1].id}
    {...commonActions}
  />
)

export const timeSet = () => (
  <TimeSet
    disabled={boolean('disabled', false)}
    setTime={action('Set time')}
    time={{ minute: number('minute', 14), hour: number('hour', 14) }}
  />
)
