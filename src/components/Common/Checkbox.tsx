import React, { FunctionComponent } from 'react'
import Switch from 'react-switch'
import { Flex, Text } from 'rebass/styled-components'

interface IProps {
  title: string
  onChange: any
  checked: boolean
}

const Checkbox: FunctionComponent<IProps> = (props: IProps) => {
  const { title, onChange, checked } = props

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
