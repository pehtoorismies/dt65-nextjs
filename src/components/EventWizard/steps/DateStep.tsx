import React, { FunctionComponent, Fragment } from 'react'
import { Flex, Text } from 'rebass'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import dateFnsFormat from 'date-fns/format'
import startOfToday from 'date-fns/startOfToday'
import isAfter from 'date-fns/isAfter'
import { BaseStep } from './BaseStep'
import { RightArrowButton, LeftArrowButton } from '../../Common'
import { isNullOrUndefined } from '../../../util/general'
import { FI_LOCAL } from '../../../constants'
import { IEventStep } from '../../../types'

interface IProps extends IEventStep {
  date?: Date
  setDate: (date: Date) => void
}

const formatDate = (date?: Date): string => {
  if (!date) {
    return 'ei valittu'
  }
  return dateFnsFormat(date, 'dd.MM.yyyy')
}

export const DateStep: FunctionComponent<IProps> = (props: IProps) => {
  const { date, toNextStep, toPrevStep, setDate } = props

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
            fontWeight="bold"
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
