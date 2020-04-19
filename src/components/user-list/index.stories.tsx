import { withA11y } from '@storybook/addon-a11y'
import { number, withKnobs } from '@storybook/addon-knobs'
import faker from 'faker'
import { times } from 'ramda'
import React from 'react'
import UserList from '.'

export default {
  title: 'User List',
  decorators: [withKnobs, withA11y],
}

const createUser = (id: number) => ({
  id,
  name: faker.name.findName(),
  email: faker.internet.email(),
  nickname: faker.internet.userName(),
})

export const userList = () => (
  <UserList users={times(createUser, number('count', 5))} />
)
