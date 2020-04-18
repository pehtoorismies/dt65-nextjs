import React, { FunctionComponent, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import Switch from 'react-switch'
import { BaseStep } from './BaseStep'
import { RightArrowButton, LeftArrowButton } from '../../Common'
import { IEventStep, ITime } from '../../../types'
import { TimeSet } from './time-set'

interface IProps extends IEventStep {
  time?: ITime
  setTime: (time: ITime) => void
  timeEnabled: boolean
  setTimeEnabled: (timeEnable: boolean) => void
}

export const TimeStep: FunctionComponent<IProps> = (props: IProps) => {
  const {
    timeEnabled,
    setTimeEnabled,
    time,
    setTime,
    toNextStep,
    toPrevStep,
  } = props

  const [internalTime, setInternalTime] = useState<ITime>(
    time || { hour: 0, minute: 0 }
  )

  const onNext = () => {
    setTime(internalTime)
    toNextStep()
  }
  const onPrev = () => {
    setTime(internalTime)
    toPrevStep()
  }

  return (
    <BaseStep title="Kellonaika">
      <Flex flexDirection="column" alignItems="center">
        <Text p={2}>Tapahtumalla tietty alkamisaika</Text>
        <Box my={2}>
          <Switch
            onChange={(val: boolean) => {
              setTimeEnabled(val)
            }}
            checked={timeEnabled}
          />
        </Box>

        <Flex justifyContent="center" alignSelf="center">
          <TimeSet
            disabled={!timeEnabled}
            time={internalTime}
            setTime={setInternalTime}
          />
        </Flex>
      </Flex>

      <Flex
        my={4}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <LeftArrowButton onClick={onPrev} visible={true} />
        <RightArrowButton onClick={onNext} visible={true} />
      </Flex>
    </BaseStep>
  )
}
