import React, { useState } from 'react'
import Switch from 'react-switch'
import { Box, Flex, Text } from 'rebass/styled-components'
import { EventStep, Time } from '../../../types'
import { LeftArrowButton, RightArrowButton } from '../../common'
import { BaseStep } from './base-step'
import { TimeSet } from './time-set'

interface Props extends EventStep {
  time?: Time
  setTime: (time: Time) => void
  timeEnabled: boolean
  setTimeEnabled: (timeEnable: boolean) => void
}

export const TimeStep = ({
  timeEnabled,
  setTimeEnabled,
  time,
  setTime,
  toNextStep,
  toPrevStep,
}: Props) => {
  const [internalTime, setInternalTime] = useState<Time>(
    time || { hour: 0, minute: 0 }
  )

  const onNext = () => {
    setTime(internalTime)
    toNextStep()
  }
  const onPrevious = () => {
    setTime(internalTime)
    toPrevStep()
  }

  return (
    <BaseStep title="Kellonaika">
      <Flex flexDirection="column" alignItems="center">
        <Text p={2}>Tapahtumalla tietty alkamisaika</Text>
        <Box my={2}>
          <Switch
            onChange={(value: boolean) => {
              setTimeEnabled(value)
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
        <LeftArrowButton onClick={onPrevious} visible={true} />
        <RightArrowButton onClick={onNext} visible={true} />
      </Flex>
    </BaseStep>
  )
}
