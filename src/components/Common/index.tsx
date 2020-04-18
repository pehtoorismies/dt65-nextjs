import * as React from 'react'
import { Text } from 'rebass/styled-components'

import ArrowButton from './ArrowButton'
import BasicInput from './BasicInput'
import BigInput from './BigInput'
import Button from './Button'
import Checkbox from './Checkbox'
import EventInput from './EventInput'
import LeftArrowButton from './LeftArrowButton'
import PortalOverlay from './PortalOverlay'
import RightArrowButton from './RightArrowButton'

const ErrorText = (props: any) => (
  <Text
    {...props}
    sx={{
      color: 'red',
      fontSize: '12px',
      fontWeight: 'bold',
      height: '15px',
      width: '100%',
    }}
  />
)

const TextLink = (props: any) => (
  <Text
    {...props}
    sx={{
      color: 'lightgray',
      cursor: 'pointer',
      fontWeight: 700,
      userSelect: 'none',
    }}
  />
)

export {
  ArrowButton,
  BasicInput,
  BigInput,
  Button,
  Checkbox,
  ErrorText,
  EventInput,
  LeftArrowButton,
  PortalOverlay,
  RightArrowButton,
  TextLink,
}
