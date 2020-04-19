import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { VIEW } from '../../types'
import { ViewChooser } from '.'

export default {
  title: 'ViewChooser',
  decorators: [withKnobs, withA11y],
}

export const viewChooser = () => (
  <ViewChooser onChooseType={action('select type')} selectedView={VIEW.LIST} />
)
