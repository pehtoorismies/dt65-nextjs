import { LoaderAlt } from '@styled-icons/boxicons-regular/LoaderAlt'
import React from 'react'
import { Button, Flex } from 'rebass/styled-components'
import styled, { keyframes } from 'styled-components'

interface IButtonProps {
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

const LoaderIcon = styled(LoaderAlt)<IButtonProps>`
  width: 15px;
  height: 15px;
  animation: ${rotate} 1s linear infinite;
  color: white;
  margin: 0 5px;
  display: ${(props: IButtonProps) => (props.isLoading ? 'block' : 'none')};
`

const LoadingButton = (props: any) => (
  <Button {...props}>
    <Flex alignItems="center" justifyContent="center">
      {props.children}
      <LoaderIcon isLoading={props.isLoading || false} />
    </Flex>
  </Button>
)

export default LoadingButton
