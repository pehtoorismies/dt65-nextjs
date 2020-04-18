import React, { FunctionComponent } from 'react'
import { Button, Flex } from 'rebass'
import { IEventStep } from '../../../types'
import { isNullOrUndefined } from '../../../util/general'
import { LeftArrowButton, RightArrowButton } from '../../Common'
import { BaseStep } from './BaseStep'

interface IProps extends IEventStep {
  isRace?: boolean
  setRace(v: boolean): void
}

const getVariant = (isYes: boolean) => (isRace?: boolean) => {
  if (isNullOrUndefined(isRace)) {
    return 'secondary'
  }

  if (isYes) {
    return isRace ? 'primary' : 'secondary'
  }
  return isRace ? 'secondary' : 'primary'
}

const getYesVariant = (isRace?: boolean) => {
  const chooser = getVariant(true)
  return chooser(isRace)
}
const getNoVariant = (isRace?: boolean) => {
  const chooser = getVariant(false)
  return chooser(isRace)
}

export const RaceStep: FunctionComponent<IProps> = (props: IProps) => {
  const { isRace, setRace, toNextStep, toPrevStep } = props
  const setRaceFalse = () => setRace(false)
  const setRaceTrue = () => setRace(true)

  return (
    <BaseStep title="Kilpailu?">
      <Flex justifyContent="center" alignSelf="center">
        <Button
          width={150}
          onClick={setRaceFalse}
          variant={getNoVariant(isRace)}
          m={1}
        >
          EI
        </Button>
        <Button
          width={150}
          onClick={setRaceTrue}
          variant={getYesVariant(isRace)}
          m={1}
        >
          KYLLÄ
        </Button>
      </Flex>
      <Flex
        my={4}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <LeftArrowButton onClick={toPrevStep} visible={true} />
        <RightArrowButton
          onClick={toNextStep}
          visible={!isNullOrUndefined(isRace)}
        />
      </Flex>
    </BaseStep>
  )
}
