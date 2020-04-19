import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import ShowError from '.'
import faker from 'faker'

export default {
  title: 'ShowError',
  decorators: [withKnobs, withA11y],
}

export const showError = () => (
  <ShowError
    error={new Error('test')}
    onGetMeOut={action('Exit')}
    componentStack={faker.lorem.paragraphs()}
  />
)
