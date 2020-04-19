import { LoaderAlt } from '@styled-icons/boxicons-regular/LoaderAlt'
import React, { PropsWithChildren } from 'react'
import { Button as ReButton, Flex, ButtonProps } from 'rebass/styled-components'
import styled, { keyframes } from 'styled-components'

interface Props {
  isLoading?: boolean
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoaderIcon = styled(LoaderAlt)<Props>`
  width: 15px;
  height: 15px;
  animation: ${rotate} 1s linear infinite;
  color: white;
  margin: 0 5px;
  display: ${(props: Props) => (props.isLoading ? 'block' : 'none')};
`

export const Button = (props: PropsWithChildren<Props & ButtonProps>) => (
  <ReButton {...props}>
    <Flex alignItems="center" justifyContent="center">
      {props.children}
      <LoaderIcon isLoading={props.isLoading || false} />
    </Flex>
  </ReButton>
)
