import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { ForgotPassword, Login, Register } from './auth'

export default {
  title: 'Auth Forms',
  decorators: [withKnobs, withA11y],
}

export const forgotPassword = () => (
  <ForgotPassword
    errorMessage={text('errorMessage', 'null')}
    onSubmit={action('Submit')}
  >
    Content
  </ForgotPassword>
)
export const login = () => <Login onSubmit={action('Submit')}>Content</Login>
export const register = () => (
  <Register onSubmit={action('Submit')}>Content</Register>
)
