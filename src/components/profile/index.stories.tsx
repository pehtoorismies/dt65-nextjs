import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { User } from '@styled-icons/boxicons-regular/User'
import React from 'react'
import { Preferences } from './preferences'
import { Profile } from '.'

export default {
  title: 'Profile',
  decorators: [withKnobs, withA11y],
}

const buttons = [
  { id: 1, title: 'Profiili', onClick: action('Profile'), icon: User },
  { id: 2, title: 'Profiili', onClick: action('Profile'), icon: User },
  { id: 3, title: 'Profiili', onClick: action('Profile'), icon: User },
  { id: 4, title: 'Profiili', onClick: action('Profile'), icon: User },
]

const preferencesProps = {
  subscribeEventCreationEmail: true,
  subscribeWeeklyEmail: false,
}

export const profile = () => <Profile nickname="koira88" buttons={buttons} />

export const preferences = () => (
  <Preferences
    preferences={preferencesProps}
    onUpdate={action('update')}
    loading={boolean('loading', false)}
  />
)
