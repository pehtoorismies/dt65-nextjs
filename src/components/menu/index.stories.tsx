import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { Footer, Header } from '.'

export default {
  title: 'Menus',
  decorators: [withKnobs, withA11y],
}

export const header = () => <Header onBack={action('Back')} />
export const footer = () => (
  <Footer
    onAddEventClick={action('Add event')}
    onHomeClick={action('Go home')}
    onProfileClick={action('Show profile')}
    onUserListClick={action('Show user list')}
  />
)
