import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { ThemeProvider } from 'styled-components'
import { theme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/global-style'

const customViewports = {
  kindleFire2: {
    name: 'Kindle Fire 2',
    styles: {
      width: '600px',
      height: '963px',
    },
  },
  kindleFireHD: {
    name: 'Kindle Fire HD',
    styles: {
      width: '533px',
      height: '801px',
    },
  },
}

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...customViewports,
    },
  },
})

addDecorator((storyFn) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
  </>
))
