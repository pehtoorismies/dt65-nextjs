import { Filter } from '@styled-icons/boxicons-regular/Filter'
import { CloseCircle } from '@styled-icons/remix-fill/CloseCircle'
import format from 'date-fns/format'
import React, { Fragment } from 'react'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'
import { colors } from '../../styles/theme'

interface Props {
  date?: Date
  onClearDate: () => void
}

const FilterIcon = styled(Filter)`
  color: ${colors.blue};
  height: 25px;
`

const CloseIcon = styled(CloseCircle)`
  color: ${colors.white};
  height: 20px;
  margin-left: 5px;
`

export const DateFilter = ({ date, onClearDate }: Props) => {
  if (date == null) {
    return <div />
  }

  const dateString = format(date, 'dd.MM.yyyy')

  return (
    <Fragment>
      <Flex flexDirection="column" width="100%" alignItems="flex-start">
        <Flex alignItems="center" justifyContent="flex-start">
          <FilterIcon />
          <Text fontSize={1}>Filtterit</Text>
        </Flex>

        <Flex
          p={2}
          bg="blue"
          sx={{
            borderRadius: '10px',
          }}
          alignItems="center"
        >
          <Text fontSize={1} color="white">
            {dateString}
          </Text>
          <CloseIcon onClick={onClearDate} />
        </Flex>
      </Flex>
    </Fragment>
  )
}
