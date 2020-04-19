import dateFnsFormat from 'date-fns/format'
import isAfter from 'date-fns/isAfter'
import startOfToday from 'date-fns/startOfToday'
import React, { Fragment } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { Flex, Text } from 'rebass'
import { FI_LOCAL } from '../../../constants'
import { EventStep } from '../../../types'
import { isNullOrUndefined } from '../../../util/general'
import { LeftArrowButton, RightArrowButton } from '../../common'
import { BaseStep } from './base-step'

interface Props extends EventStep {
  date?: Date
  setDate: (date: Date) => void
}

const formatDate = (date?: Date): string => {
  if (!date) {
    return 'ei valittu'
  }
  return dateFnsFormat(date, 'dd.MM.yyyy')
}

export const DateStep = ({ date, toNextStep, toPrevStep, setDate }: Props) => {
  const handleDayClick = (selectedDay: Date) => {
    if (isAfter(startOfToday(), selectedDay)) {
      return
    }
    setDate(selectedDay)
  }
  const toDay = (day: Date) => setDate(day)

  return (
    <Fragment>
      <BaseStep title="Päivämäärä">
        <Flex
          width="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text p={2}>Klikkaa haluamasi päivämäärä</Text>
          <Text
            fontWeight="600"
            width={250}
            textAlign="center"
            p={2}
            fontSize={2}
            color="white"
            bg="blue"
            sx={{
              visibility: date ? 'visible' : 'hidden',
              borderRadius: '4px',
            }}
          >
            valittu {formatDate(date)}
          </Text>
          <DayPicker
            {...FI_LOCAL}
            todayButton="Tämä päivä"
            fromMonth={new Date(2019, 9)}
            onDayClick={handleDayClick}
            selectedDays={date}
            onTodayButtonClick={toDay}
          />
        </Flex>
        <Flex
          pt={2}
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <LeftArrowButton onClick={toPrevStep} visible={true} />
          <RightArrowButton
            onClick={toNextStep}
            visible={!isNullOrUndefined(date)}
          />
        </Flex>
      </BaseStep>
    </Fragment>
  )
}
