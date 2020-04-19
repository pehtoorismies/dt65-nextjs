import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { DateFilter } from '.'

export default {
  title: 'DateFilter',
  decorators: [withKnobs, withA11y],
}

export const dateFilter = () => (
  <DateFilter date={new Date()} onClearDate={action('Clear')} />
)
