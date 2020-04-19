import React, { PropsWithChildren } from 'react'
import { Box, Text } from 'rebass/styled-components'

interface Props {
  title: string
}

export const BaseStep = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <Box width="100%">
      <Text fontSize={[4, 5, 6]} textAlign="center" fontWeight="600" py={2}>
        {title}
      </Text>
      {children}
    </Box>
  )
}
