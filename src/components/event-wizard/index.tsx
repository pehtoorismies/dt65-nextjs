import { CancelCircle } from '@styled-icons/icomoon/CancelCircle'
import { mergeRight } from 'ramda'
import React, { useState } from 'react'
import { PortalWithState } from 'react-portal'
import { Box, Flex, Text } from 'rebass'
import styled from 'styled-components'
import { EVENT_TYPES } from '../../constants'
import { IEventReq, IEventState } from '../../types'
import { dateToISOString, toApiType } from '../../util'
import { Button, PortalOverlay } from '../common'
import { StepCounter } from './step-counter'
import { getStep } from './step-getter'

interface Props {
  applyEvent: (evt: IEventReq) => void
  nickname: string
  errorMessage?: string
  editState?: IEventState
  onCancel: () => void
}

const Header = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-areas: 'empty header cancel';
  align-items: center;
  height: 50px;
`

const Cancel = styled(CancelCircle)`
  height: 25px;
  grid-area: header;
`

const MAX_STEP = 7

export const EventWizard = ({
  applyEvent,
  nickname,
  editState,
  onCancel,
}: Props) => {
  const [step, setStep] = useState<number>(0)
  const isEdit = !!editState

  const initState = editState || {
    time: { hour: 12, minute: 0 },
    timeEnabled: false,
    creatorJoining: true,
  }

  const [eventState, setEventState] = useState<IEventState>(initState)

  const create = (): void => {
    if (!eventState.date || !eventState.type || !eventState.title) {
      throw new Error('Impossible state') // TODO: fix
    }

    const exactTime = eventState.timeEnabled
    const date = exactTime
      ? dateToISOString(eventState.date, eventState.time)
      : dateToISOString(eventState.date)
    const creatorJoining = eventState.creatorJoining
    const description = eventState.description
    const race = eventState.race || false
    const subtitle = eventState.subtitle
    const title = eventState.title
    const type: string = toApiType(eventState.type, EVENT_TYPES)

    const mandatory = {
      exactTime,
      date,
      type,
      title,
      race,
      creatorJoining,
    }
    const optional = {
      description,
      subtitle,
    }

    const event: IEventReq = mergeRight(mandatory, optional)

    applyEvent(event)
  }

  return (
    <PortalWithState closeOnOutsideClick={true} closeOnEsc={true}>
      {({ openPortal, closePortal, portal }) => {
        const onCancelWizard = () => {
          closePortal()
          onCancel()
        }
        return (
          <React.Fragment>
            <Box>
              <Header>
                <Text textAlign="center" sx={{ gridArea: 'header' }}>
                  Tapahtuman luonti
                </Text>
                <Button
                  variant="empty"
                  color="pink"
                  sx={{ gridArea: 'cancel', justifySelf: 'end' }}
                  onClick={openPortal}
                >
                  <Cancel />
                </Button>
              </Header>

              <Flex p={1} justifyContent="center">
                <StepCounter completed={step} total={MAX_STEP} />
              </Flex>
              <Flex>
                {getStep(
                  step,
                  setStep,
                  eventState,
                  setEventState,
                  create,
                  nickname,
                  isEdit
                )}
              </Flex>
            </Box>
            {portal(
              <PortalOverlay onClick={closePortal}>
                <Flex
                  onClick={(event) => event.stopPropagation()}
                  width="80%"
                  sx={{
                    borderRadius: '10px',
                    maxWidth: '300px',
                    border: '2px solid lightgrey',
                  }}
                  p={4}
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  bg="white"
                >
                  <Text fontWeight="600" my={2}>
                    Keskeytä?
                  </Text>
                  <Button
                    onClick={onCancelWizard}
                    variant="warn"
                    my={2}
                    width="100%"
                  >
                    KESKEYTÄ
                  </Button>
                  <Button
                    onClick={closePortal}
                    variant="secondary"
                    my={2}
                    width="100%"
                  >
                    Jatka
                  </Button>
                </Flex>
              </PortalOverlay>
            )}
          </React.Fragment>
        )
      }}
    </PortalWithState>
  )
}
