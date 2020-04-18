import { LeftArrow } from '@styled-icons/boxicons-solid/LeftArrow'
import React from 'react'
import { Button, Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components'

const Arrow = styled(LeftArrow)`
  height: 15px;
  width: 15px;
`

const LeftArrowButton = (props: any) => (
  <Button
    {...props}
    variant="outlinePrimary"
    m={1}
    width={150}
    sx={{ visibility: props.visible ? 'visible' : 'hidden' }}
  >
    <Flex alignItems="center" justifyContent="flex-start">
      <Arrow />
      <Text mx={2}>{props.text || 'EDELLINEN'}</Text>
    </Flex>
  </Button>
)

export default LeftArrowButton
