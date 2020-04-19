import * as React from 'react'
import { Text, TextProps } from 'rebass/styled-components'
import { ArrowButton, LeftArrowButton, RightArrowButton } from './arrow-button'
import { BasicInput } from './basic-input'
import { BigInput } from './big-input'
import { Button } from './button'
import Checkbox from './checkbox'
import EventInput from './event-input'
import PortalOverlay from './portal-overlay'

const ErrorText = (props: TextProps) => (
  <Text
    {...props}
    sx={{
      color: 'red',
      fontSize: '12px',
      fontWeight: '600',
      height: '15px',
      width: '100%',
    }}
    css=""
  />
)

const TextLink = (props: TextProps) => (
  <Text
    {...props}
    sx={{
      color: 'lightgray',
      cursor: 'pointer',
      fontWeight: 600,
      userSelect: 'none',
    }}
    css=""
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
