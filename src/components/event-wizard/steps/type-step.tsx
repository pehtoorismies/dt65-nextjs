import { map, prop, sortBy } from 'ramda'
import React from 'react'
import { Button, Flex } from 'rebass/styled-components'
import { EventType, EventStep, EventTypeDescriptor } from '../../../types'
import { RightArrowButton } from '../../common'
import { BaseStep } from './base-step'

const sortByTitle = sortBy(prop('title'))

interface Props extends EventStep {
  selectedType?: EventType
  types: EventTypeDescriptor[]
  setSelectedType: OnSelectType
}

type OnSelectType = (type: EventType) => void

const renderTypeButton = (
  setSelected: OnSelectType,
  selectedType?: EventType
) => (type: EventTypeDescriptor) => {
  const isSelected = selectedType === type.id

  const variant = isSelected ? 'primary' : 'secondary'
  const selectedClick = () => {
    if (!isSelected) {
      setSelected(type.id)
    }
  }
  return (
    <Button
      key={type.id}
      width={140}
      onClick={selectedClick}
      variant={variant}
      m={1}
    >
      {type.title}
    </Button>
  )
}

export const TypeStep = ({
  selectedType,
  types,
  setSelectedType,
  toNextStep,
}: Props) => {
  const ordered = sortByTitle(types)
  const typeRender = renderTypeButton(setSelectedType, selectedType)
  return (
    <BaseStep title="Valitse tyyppi">
      <Flex flexWrap="wrap" justifyContent="center">
        {map(typeRender, ordered)}
      </Flex>
      <Flex my={4} width="100%" alignItems="center" justifyContent="flex-end">
        <RightArrowButton onClick={toNextStep} visible={!!selectedType} />
      </Flex>
    </BaseStep>
  )
}
