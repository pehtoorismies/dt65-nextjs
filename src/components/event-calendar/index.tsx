import styled from '@emotion/styled'
import { format } from 'date-fns'
import {
  addMonths,
  formatWithOptions,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  startOfMonth,
} from 'date-fns/fp'
import { fi } from 'date-fns/locale'
import { filter, head, map, pipe, times } from 'ramda'
import React, { Fragment } from 'react'
import { Box, Flex, Image, Text } from 'rebass'
import uuidv4 from 'uuid/v4'
import { WEEK_DAYS } from '../../constants'
import logoCycling from '../../images/calendar-logos/cycling.png'
import logoKickoff from '../../images/calendar-logos/kickoff.png'
import logoOrienteering from '../../images/calendar-logos/orienteering.png'
import logoOther from '../../images/calendar-logos/other.png'
import logoParty from '../../images/calendar-logos/party.png'
import logoRunning from '../../images/calendar-logos/running.png'
import logoSkiing from '../../images/calendar-logos/skiing.png'
import logoSwimming from '../../images/calendar-logos/swimming.png'
import logoTriathlon from '../../images/calendar-logos/triathlon.png'
import { colors } from '../../styles/theme'
import { EventType, CalEvent, YearMonth } from '../../types'

type DaySelect = (date: string) => void

interface Props {
  start: YearMonth
  monthCount: number
  events: CalEvent[]
  onSelectDay: DaySelect
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 80px;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 40px;
`

const renderHeader = (dayOfWeek: string) => {
  return (
    <Flex
      key={uuidv4()}
      color="white"
      alignItems="center"
      justifyContent="center"
      bg="blue"
    >
      {dayOfWeek}
    </Flex>
  )
}

const renderBlank = () => {
  return (
    <Flex
      key={uuidv4()}
      color="white"
      alignItems="center"
      justifyContent="center"
      bg="darkWhite"
    />
  )
}

const icons = {
  [EventType.Cycling]: logoCycling,
  [EventType.Karonkka]: logoParty,
  [EventType.Meeting]: logoKickoff,
  [EventType.NordicWalking]: logoRunning,
  [EventType.Orienteering]: logoOrienteering,
  [EventType.Other]: logoOther,
  [EventType.Running]: logoRunning,
  [EventType.Skiing]: logoSkiing,
  [EventType.Spinning]: logoCycling,
  [EventType.Swimming]: logoSwimming,
  [EventType.TrackRunning]: logoRunning,
  [EventType.TrailRunning]: logoRunning,
  [EventType.Triathlon]: logoTriathlon,
  [EventType.Ultras]: logoKickoff,
}

const renderEventIcon = (event: CalEvent) => {
  return (
    <Image
      key={uuidv4()}
      m={1}
      src={icons[event.type]}
      sx={{
        width: '16px',
        height: '16px',
      }}
    />
  )
}

const renderDay = (monthEvents: CalEvent[], onSelectDay: DaySelect) => (
  index: number
) => {
  const filterByDay = (event: CalEvent) => {
    return index + 1 === getDate(event.date)
  }

  const currentDayEvents = filter(filterByDay, monthEvents)
  const hasEvents = currentDayEvents.length > 0

  const onSelect = () => {
    const event: CalEvent | undefined = head(currentDayEvents)
    if (event) {
      const f = format(event.date, 'yyyy-MM-dd')
      onSelectDay(f)
    }
  }

  return (
    <Flex
      p={1}
      flexDirection="column"
      key={uuidv4()}
      alignItems="center"
      justifyContent="flex-start"
      bg={hasEvents ? 'lightPink' : 'white'}
      sx={{ borderBottom: `1px solid ${colors.lightergray}` }}
      onClick={onSelect}
    >
      <Text
        color={hasEvents ? 'standardBlack' : 'grey'}
        fontFamily="monospace"
        fontSize={1}
      >
        {index + 1}
      </Text>
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
        {map(renderEventIcon, currentDayEvents)}
      </Flex>
    </Flex>
  )
}

const startOfMonthDay = pipe(startOfMonth, getDay)

const toMonthString = formatWithOptions({ locale: fi }, 'LLLL')

const renderMonth = (events: CalEvent[], onSelectDay: DaySelect) => (
  yearMonth: YearMonth
) => {
  const { year, monthIndex } = yearMonth
  const now = new Date(year, monthIndex)
  const d = startOfMonthDay(now)
  const daysInMonth = getDaysInMonth(now)
  const startBlanksCount = d === 0 ? 6 : d - 1
  const endBlanksCount = 7 - ((daysInMonth + startBlanksCount) % 7)

  const filterByDate = (event: CalEvent) =>
    getMonth(event.date) === monthIndex && getYear(event.date) === year

  const currentMonthEvents = filter(filterByDate, events)

  return (
    <Fragment key={uuidv4()}>
      <Flex p={2}>
        <Text
          color="gray"
          sx={{ borderBottom: `1px solid ${colors.lightestgray}` }}
        >
          {toMonthString(now)} {year}
        </Text>
      </Flex>
      <Grid>
        {times(renderBlank, startBlanksCount)}
        {times(renderDay(currentMonthEvents, onSelectDay), daysInMonth)}
        {times(renderBlank, endBlanksCount)}
      </Grid>
    </Fragment>
  )
}

// ramda flip does not work
const monthAdder = (date: Date) => (toAdd: number) => addMonths(toAdd, date)
const toMonthYear = (d: Date) => ({
  year: getYear(d),
  monthIndex: getMonth(d),
})

const createCalendarMonths = (start: YearMonth, count: number) => {
  const startDate = new Date(start.year, start.monthIndex)
  const adder = monthAdder(startDate)

  const toYearMonths = pipe(times(adder), map(toMonthYear))

  return toYearMonths(count)
}

const EventCalendar = (props: Props) => {
  const { start, monthCount, events, onSelectDay } = props

  const nextMonths = createCalendarMonths(start, monthCount)

  return (
    <div>
      <Header>{map(renderHeader, WEEK_DAYS)}</Header>
      <Box>{map(renderMonth(events, onSelectDay), nextMonths)}</Box>
    </div>
  )
}

export default EventCalendar
