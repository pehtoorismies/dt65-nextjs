import React, { PropsWithChildren } from 'react'
import { Flex, Text } from 'rebass/styled-components'

interface Props {
  message: string
}

const InfoMessage = ({ children, message }: PropsWithChildren<Props>) => {
  return (
    <Flex
      flexDirection="column"
      sx={{ height: '90vh' }}
      alignItems="center"
      justifyContent="center"
    >
      <Text textAlign="center" lineHeight={1.5} p={3}>
        {message}
      </Text>
      {children}
    </Flex>
  )
}

export default InfoMessage
