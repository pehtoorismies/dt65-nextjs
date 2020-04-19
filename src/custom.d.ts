import { InterpolationWithTheme } from '@emotion/core'
import React from 'react'

declare module 'rebass' {
  interface FlexProps {
    as?: React.ElementType
    css?: InterpolationWithTheme<any>
  }
  interface BoxProps {
    as?: React.ElementType
    css?: InterpolationWithTheme<any>
  }
  interface TextProps {
    as?: React.ElementType
    css?: InterpolationWithTheme<any>
  }
  interface HeadingProps {
    as?: React.ElementType
    css?: InterpolationWithTheme<any>
  }
  interface LinkProps {
    as?: React.ElementType
    css?: InterpolationWithTheme<any>
  }
  interface ButtonProps {
    as?: React.ElementType
    css?: InterpolationWithTheme<any>
  }
}
