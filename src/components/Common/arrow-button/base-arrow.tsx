import { RightArrow } from '@styled-icons/boxicons-solid/RightArrow'
import { StyledIcon } from '@styled-icons/styled-icon'
import React from 'react'
import { Button, Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components'

interface Props {
  title: string
  onClick: () => void
  icon: StyledIcon
}

const Arrow = styled(RightArrow)`
  color: white;
  height: 15px;
  width: 15px;
`

export const ArrowButton = ({ title, onClick, icon }: Props) => {
  const Icn = styled(icon)`
    color: white;
    height: 18px;
    width: 18px;
    margin-right: 6px;
  `

  return (
    <Button my={1} onClick={onClick} variant="secondary" width="100%">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Icn />
          <Text>{title}</Text>
        </Flex>
        <Arrow />
      </Flex>
    </Button>
  )
}
