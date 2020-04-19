import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { ErrorPage } from '.'

export default {
  title: 'ErrorPage',
  decorators: [withKnobs, withA11y],
}

export const errorPage = () => <ErrorPage onGetMeOut={action('Exit')} />
