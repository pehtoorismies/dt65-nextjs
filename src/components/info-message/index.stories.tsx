import { withA11y } from '@storybook/addon-a11y'
import { text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import InfoMessage from '.'

export default {
  title: 'InfoMessage',
  decorators: [withKnobs, withA11y],
}

export const infoMessage = () => (
  <InfoMessage message={text('message', 'This is info message')} />
)
