import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { UserInfo } from '.'

export default {
  title: 'UserInfo',
  decorators: [withKnobs, withA11y],
}

const getUserInfo = () => ({
  email: text('email', 'test@test.com'),
  name: text('name', 'Kaleva Kikkinen'),
  id: 'a1234',
  nickname: text('nickname', 'sikakoirala'),
})

export const userInfo = () => (
  <UserInfo userInfo={getUserInfo()} onSubmit={action('Submit')} />
)
