import { LeftArrow } from '@styled-icons/boxicons-solid/LeftArrow'
import { RightArrow } from '@styled-icons/boxicons-solid/RightArrow'
import React, { PropsWithChildren } from 'react'
import { Button, Flex, Text, ButtonProps } from 'rebass/styled-components'
import styled from 'styled-components'

type Props = {
  visible: boolean
  text?: string
}

const LArrow = styled(LeftArrow)`
  height: 15px;
  width: 15px;
`

const RArrow = styled(RightArrow)`
  height: 15px;
  width: 15px;
`

const Base = (props: PropsWithChildren<Props & ButtonProps>) => (
  <Button
    {...props}
    variant="outlinePrimary"
    m={1}
    width={150}
    sx={{ visibility: props.visible ? 'visible' : 'hidden' }}
    css=""
  >
    {props.children}
  </Button>
)

export const LeftArrowButton = (props: Props & ButtonProps) => (
  <Base {...props} css="">
    <Flex alignItems="center" justifyContent="flex-start">
      <LArrow />
      <Text mx={2}>{props.text || 'Edellinen'}</Text>
    </Flex>
  </Base>
)

export const RightArrowButton = (props: Props & ButtonProps) => (
  <Base {...props} css="">
    <Flex alignItems="center" justifyContent="flex-end">
      <Text mx={2}>{props.text || 'Seuraava'}</Text>
      <RArrow />
    </Flex>
  </Base>
)
