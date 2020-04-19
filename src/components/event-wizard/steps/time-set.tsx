import { DownArrow } from '@styled-icons/boxicons-solid/DownArrow'
import { UpArrow } from '@styled-icons/boxicons-solid/UpArrow'
import { add, assoc, subtract } from 'ramda'
import React, { FunctionComponent } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import styled from 'styled-components'
import { ITime } from '../../../types'
import { timeToString } from '../../../util'

interface IProps {
  time?: ITime
  setTime: (time: ITime) => void
  disabled: boolean
}

const BOX_WIDTH = 70

const Up = styled(UpArrow)`
  color: white;
  width: 30px;
`
const Down = styled(DownArrow)`
  color: white;
  width: 30px;
`

const UpButton = (props: any) => (
  <Button {...props} variant="secondary" m={1} width={BOX_WIDTH}>
    <Flex alignItems="center" justifyContent="center">
      <Up />
    </Flex>
  </Button>
)

const DownButton = (props: any) => (
  <Button {...props} variant="secondary" m={1} width={BOX_WIDTH}>
    <Flex alignItems="center" justifyContent="center">
      <Down />
    </Flex>
  </Button>
)

const Center = (props: any) => (
  <Flex {...props} justifyContent="center" alignItems="center" />
)

const NumberDisplay = (props: any) => (
  <Text
    {...props}
    fontSize={50}
    fontWeight="600"
    fontFamily="monospace"
    width={BOX_WIDTH * 2}
    textAlign="center"
    m={1}
  />
)

export const TimeSet: FunctionComponent<IProps> = (props: IProps) => {
  const { time = { minute: 0, hour: 0 }, setTime, disabled } = props

  const adjustMinute = (isAdd: boolean) => {
    const f = isAdd ? add : subtract
    const newTime = f(time.minute, 5)

    if (isAdd && newTime >= 60) {
      setTime(assoc('minute', 0, time))
    } else if (!isAdd && newTime <= 0) {
      setTime(assoc('minute', 55, time))
    } else {
      setTime(assoc('minute', newTime, time))
    }
  }

  const adjustHour = (isAdd: boolean) => {
    const f = isAdd ? add : subtract
    const newTime = f(time.hour, 1)

    if (isAdd && newTime >= 24) {
      setTime(assoc('hour', 0, time))
    } else if (!isAdd && newTime <= 0) {
      setTime(assoc('hour', 23, time))
    } else {
      setTime(assoc('hour', newTime, time))
    }
  }

  const upHour = () => adjustHour(true)
  const upMinute = () => adjustMinute(true)
  const downHour = () => adjustHour(false)
  const downMinute = () => adjustMinute(false)

  return (
    <Box p={2}>
      <Center>
        <UpButton disabled={disabled} onClick={upHour} />
        <UpButton disabled={disabled} onClick={upMinute} />
      </Center>
      <Center justifyContent="center" alignItems="center">
        <NumberDisplay color={disabled ? 'lightestgray' : 'black'}>
          {timeToString(time)}
        </NumberDisplay>
      </Center>
      <Center>
        <DownButton disabled={disabled} onClick={downHour} />
        <DownButton disabled={disabled} onClick={downMinute} />
      </Center>
    </Box>
  )
}
