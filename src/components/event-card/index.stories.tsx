import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import faker from 'faker'
import { times } from 'ramda'
import React from 'react'
import { EVENT_TYPES } from '../../constants'
import { User } from '../../types'
import { HeadCountButton } from './head-count-button'
import { EventCard } from '.'

export default {
  title: 'EventCard',
  decorators: [withKnobs, withA11y],
}

const rand = faker.random.number(EVENT_TYPES.length - 1)

const createParticipant = (id: number): User => {
  return {
    id: String(id),
    username: faker.internet.userName(),
    nickname: faker.internet.userName(),
    sub: String(id),
  }
}

const loremHtml = `<p>p: ${faker.lorem.sentence()} 
<strong>strong: ${faker.lorem.sentence()}</strong>
<em>em: ${faker.lorem.sentence()}</em>
<u>u: ${faker.lorem.sentence()}</u>
<h1>h1: ${faker.lorem.sentence()}</h1>
</p>
<ol>
<li> ${faker.lorem.word()}</li>
<li> ${faker.lorem.word()}</li>
<li> ${faker.lorem.word()}</li>
</ol>
<p>
<ul>
  <li> ${faker.lorem.word()}</li>
  <li> ${faker.lorem.word()}</li>
  <li> ${faker.lorem.word()}</li>
</ul>
</p>
`

const participants = times(createParticipant, faker.random.number(10) + 5)

export const eventCard = () => (
  <EventCard
    id={1}
    joinEvent={action('join event')}
    onGotoLogin={action('goto login')}
    onDeleteClick={action('Delete')}
    onEditClick={action('Edit')}
    onViewClick={action('View')}
    date={text('date', '12.12.2022')}
    title={faker.commerce.productName()}
    subtitle={faker.commerce.productName()}
    user={{
      picture: 'https://koira',
      name: 'Sika Simo',
      nickname: 'peelo',
      sub: '123',
    }}
    creator={text('creator', 'hundman')}
    race={boolean('Race', false)}
    time={text('time', '10:00')}
    type={EVENT_TYPES[rand]}
    description={loremHtml}
    participants={participants}
  />
)

export const headCountButton = () => (
  <HeadCountButton
    count={number('Count', 65)}
    onClick={action('Click')}
    isParticipant={boolean('isParticipant', false)}
  />
)
