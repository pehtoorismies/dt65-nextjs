import React from 'react'
import Switch from 'react-switch'
import { Flex, Text } from 'rebass/styled-components'

interface Props {
  title: string
  onChange: (
    checked: boolean,
    event: React.SyntheticEvent<MouseEvent | KeyboardEvent> | MouseEvent,
    id: string
  ) => void
  checked: boolean
}

const Checkbox = ({ title, onChange, checked }: Props) => {
  return (
    <Flex
      p={2}
      my={1}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Text fontWeight="600" color={checked ? 'black' : 'grey'}>
        {title}
      </Text>
      <Switch onChange={onChange} checked={checked} />
    </Flex>
  )
}

export default Checkbox
