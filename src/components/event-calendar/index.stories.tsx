import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { CalEvent, EventType, YearMonth } from '../../types'
import EventCalendar from '.'

export default {
  title: 'Event Calendar',
  decorators: [withKnobs, withA11y],
}

const start: YearMonth = { year: 2019, monthIndex: 9 }

const events: CalEvent[] = [
  {
    date: new Date(2019, 9, 28),
    type: EventType.Running,
  },
  {
    date: new Date(2019, 11, 2),
    type: EventType.Ultras,
  },
  {
    date: new Date(2019, 11, 12),
    type: EventType.Orienteering,
  },
  {
    date: new Date(2019, 11, 31),
    type: EventType.Orienteering,
  },
  {
    date: new Date(2019, 11, 31),
    type: EventType.Orienteering,
  },
]

export const eventCalendar = () => (
  <EventCalendar
    start={start}
    monthCount={12}
    events={events}
    onSelectDay={action('Select')}
  />
)
