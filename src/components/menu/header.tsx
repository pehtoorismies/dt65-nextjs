import React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import styled from '@emotion/styled'
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack'
import { colors } from '../../styles/theme'
import { Menubar } from './menubar'

interface Props {
  pageTitle?: string
  onBack: () => void
  backDisabled?: boolean
}

const BackIcon = styled(ArrowBack)`
  color: ${colors.pink};
  height: 25px;
`

export const Header = (props: Props) => {
  const { pageTitle, onBack, backDisabled } = props

  const backButton = backDisabled ? undefined : (
    <Flex sx={{ borderRadius: '50%' }} bg="darkWhite" p={1}>
      <BackIcon onClick={onBack} />
    </Flex>
  )

  return (
    <Menubar isFixedTop={true}>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" ml={2}>
          {backButton}
          <Text ml={3} fontWeight="600">
            Downtown65.events
          </Text>
        </Flex>

        <Text
          mr={3}
          textAlign="right"
          color="grey"
          fontFamily="monospace"
          fontSize={1}
        >
          /{pageTitle}
        </Text>
      </Flex>
    </Menubar>
  )
}
