import { Circle } from '@styled-icons/boxicons-regular/Circle'
import { HelpCircle } from '@styled-icons/boxicons-regular/HelpCircle'
import { CheckCircle } from '@styled-icons/boxicons-solid/CheckCircle'
import { Dash } from '@styled-icons/octicons/Dash'
import { flatten, intersperse, map, repeat } from 'ramda'
import React, { FunctionComponent } from 'react'
import { Box, Text } from 'rebass'
import styled, { withTheme } from 'styled-components'
import uuidv4 from 'uuid/v4'

// @ts-ignore - hack
const getPink = (theme) => theme.colors.pink

const EmptyCircle = styled(Circle)`
  color: ${(props) => getPink(props.theme)};
  width: 20px;
`
const CurrentCircle = styled(HelpCircle)`
  color: ${(props) => getPink(props.theme)};
  width: 20px;
`
const CheckedCircle = styled(CheckCircle)`
  color: ${(props) => getPink(props.theme)};
  width: 20px;
`
const Connector = styled(Dash)`
  color: ${(props) => getPink(props.theme)};
  width: 15px;
`

interface IProps {
  total: number
  completed: number
  theme?: any //TODO: hack
}

enum Element {
  Checked = 0,
  Empty = 1,
  Connector = 2,
  Current = 3,
}

const getElement = (ele: Element) => {
  switch (ele) {
    case Element.Checked:
      return <CheckedCircle key={uuidv4()} />
    case Element.Empty:
      return <EmptyCircle key={uuidv4()} />
    case Element.Connector:
      return <Connector key={uuidv4()} />
    case Element.Current:
      return <CurrentCircle key={uuidv4()} />
    default:
      return null
  }
}

const StepCounter: FunctionComponent<IProps> = (props: IProps) => {
  const { total, completed } = props

  const uncompleted = total - completed - 1 >= 0 ? total - completed - 1 : 0

  const completedElems = repeat(Element.Checked, completed)
  const uncompletedElems = repeat(Element.Empty, uncompleted)
  const all = flatten([completedElems, [Element.Current], uncompletedElems])
  const withDashes = intersperse(Element.Connector, all)

  return (
    <Box>
      {map(getElement, withDashes)}
      <Text textAlign="center" fontSize={10} fontFamily="monospace">
        steps
      </Text>
    </Box>
  )
}

export default withTheme(StepCounter)
