import React from 'react'
import { RightArrow } from '@styled-icons/boxicons-solid/RightArrow'
import { Button, Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components'

const Arrow = styled(RightArrow)`
  height: 15px;
  width: 15px;
`

const RightArrowButton = (props: any) => (
  <Button
    {...props}
    variant="outlinePrimary"
    m={1}
    width={150}
    sx={{ visibility: props.visible ? 'visible' : 'hidden' }}
  >
    <Flex alignItems="center" justifyContent="flex-end">
      <Text mx={2}>{props.text || 'Seuraava'}</Text>
      <Arrow />
    </Flex>
  </Button>
)

export default RightArrowButton
