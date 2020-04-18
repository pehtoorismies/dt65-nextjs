import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import { User } from '@styled-icons/boxicons-regular/User'
import React from 'react'
import { ArrowButton, Button, Checkbox, ErrorText } from './'

export default {
  title: 'Components',
  decorators: [withKnobs, withA11y],
}

const buttonVariants = {
  primary: 'primary',
  outline: 'outline',
  outlinePrimary: 'outlinePrimary',
  secondary: 'secondary',
}

export const button = () => (
  <Button
    variant={select('variant', buttonVariants, 'primary')}
    onClick={action('clicked')}
    disabled={boolean('disabled', false)}
    isLoading={boolean('isLoading', false)}
  >
    I'm Button
  </Button>
)

export const errorText = () => <ErrorText>This is error</ErrorText>

export const arrowButton = () => (
  <ArrowButton title="Arrow Button" icon={User} onClick={action('click')} />
)

export const checkBox = () => (
  <Checkbox
    title="Arrow Button"
    onChange={action('click')}
    checked={boolean('Checked', false)}
  />
)
