import React, { Fragment } from 'react'
import { Box, Text } from 'rebass/styled-components'
import { Checkbox } from '../common'

interface Checkbox {
  id: string | number
  title: string
  checked: boolean
  onChange(): void
}

interface Props {
  checkboxes: Checkbox[]
}

export const Subscriptions = ({ checkboxes }: Props) => {
  return (
    <Fragment>
      <Box p={3} bg="lightestgray">
        <Text
          fontWeight="600"
          color="black"
          textAlign="center"
          lineHeight={1.5}
          letterSpacing={1.5}
          p={1}
        >
          Sähköpostitilaukset
        </Text>
      </Box>
      <Box>
        {checkboxes.map((c: Checkbox) => (
          <Checkbox key={c.id} {...c} />
        ))}
      </Box>
    </Fragment>
  )
}
