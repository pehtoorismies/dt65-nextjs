import { Calendar } from '@styled-icons/boxicons-regular/Calendar'
import { ListUl } from '@styled-icons/boxicons-regular/ListUl'
import React from 'react'
import { Box, Button, Flex } from 'rebass/styled-components'
import styled from 'styled-components'
import { VIEW } from '../../types'

interface Color {
  color: string
}

const CalendarView = styled(Calendar)<Color>`
  color: ${(props: Color) => props.color};
  height: 20px;
`
const ListView = styled(ListUl)<Color>`
  color: ${(props: Color) => props.color};
  height: 20px;
`

interface Props {
  onChooseType: (type: VIEW) => void
  selectedView: VIEW
}

export const ViewChooser = (props: Props) => {
  const { onChooseType, selectedView } = props

  const selectCalendar = () => onChooseType(VIEW.CALENDAR)
  const selectList = () => onChooseType(VIEW.LIST)

  return (
    <Flex width="100%" bg="white" py={1}>
      <Box width="50%" mr="2px">
        <Button
          p={1}
          variant={selectedView === VIEW.LIST ? 'primary' : 'greyed'}
          onClick={selectList}
          width="100%"
        >
          <ListView color="white" />
        </Button>
      </Box>
      <Box width="50%">
        <Button
          p={1}
          variant={selectedView === VIEW.CALENDAR ? 'primary' : 'greyed'}
          onClick={selectCalendar}
          width="100%"
        >
          <CalendarView color="white" />
        </Button>
      </Box>
    </Flex>
  )
}
