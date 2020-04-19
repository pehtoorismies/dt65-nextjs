import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { Subscriptions } from '.'

export default {
  title: 'Subscriptions',
  decorators: [withKnobs, withA11y],
}

const checkboxes = [
  {
    id: 1,
    title: 'Lähetä sähköposti, kun uusi tapahtuma on luotu',
    onChange: action('switch'),
    checked: true,
  },
  {
    id: 1,
    title: 'Lähetä viikkoposti tapahtumista',
    onChange: action('switch'),
    checked: false,
  },
]

export const subscriptions = () => <Subscriptions checkboxes={checkboxes} />
