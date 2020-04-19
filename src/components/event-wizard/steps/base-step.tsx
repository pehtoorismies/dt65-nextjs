import React, { FunctionComponent, PropsWithChildren } from 'react'
import { Box, Text } from 'rebass'

interface Props {
  title: string
}

export const BaseStep: FunctionComponent<Props> = ({
  title,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Box width="100%">
      <Text fontSize={[4, 5, 6]} textAlign="center" fontWeight="600" py={2}>
        {title}
      </Text>
      {children}
    </Box>
  )
}