import { Edit } from '@styled-icons/boxicons-regular/Edit'
import { CaretDownCircle } from '@styled-icons/boxicons-solid/CaretDownCircle'
import { Medal } from '@styled-icons/fa-solid/Medal'
import parse, { DomElement, domToReact } from 'html-react-parser'
import { map } from 'ramda'
import React, { FunctionComponent, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { PortalWithState } from 'react-portal'
import Switch from 'react-switch'
import { toast } from 'react-toastify'
import { Box, Card, Flex, Heading, Text } from 'rebass/styled-components'
import styled, { css } from 'styled-components'
import { colors } from '../../styles/theme'
import { ID, IEvent, ILocalUser, IUser } from '../../types'
import { isParticipant } from '../../util/general'
import { Button, PortalOverlay } from '../Common'
import HeadCountButton from './head-count-button'

interface IProps extends IEvent {
  isJoining?: boolean
  user?: ILocalUser
  eventImage?: string
  joinEvent?: (eventId: ID) => void
  stayOpened?: boolean
  onViewClick?: (eventId: ID) => void
  onEditClick?: (eventId: ID) => void
  onDeleteClick?: (eventId: ID) => void
  onGotoLogin?: () => void
}

const ANIM_TIME = 500

const borderStyle = '1px solid #e9e9e9'

interface IBoxProps {
  bgImage: string
}

const ImageBox = styled.div<IBoxProps>`
  display: grid;
  background-size: cover;
  border-radius: 15px 15px 0 0;
  font-weight: bold;
  height: 150px;
  width: 100%;
  background-image: url(${(props: IBoxProps) => props.bgImage});
  grid-template-rows: 30px auto 20px;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    'header'
    'title'
    'creator';
`

const Race = styled(Medal)`
  color: white;
  width: 30px;
  padding: 4px;
`

const common = css`
  color: white;
  height: 20px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`

const EditBtn = styled(Edit)`
  ${common};
`

interface IArrowProps {
  pointDown: boolean
}

const DownArrow = styled(CaretDownCircle)<IArrowProps>`
  ${common};
  margin-left: 3px;
  margin-right: 10px;
  transform: rotate(
    ${(props: IArrowProps) => (props.pointDown ? '0' : '180deg')}
  );
  transition: transform ${ANIM_TIME}ms ease;
`

const Pill = (props: any) => (
  <Flex
    {...props}
    margin="2px"
    sx={{
      borderRadius: '4px',
    }}
  />
)

const renderPill = (currentUser?: ILocalUser) => (participant: IUser) => {
  const { sub } = participant
  const userSub = currentUser ? currentUser.sub : null
  const color = sub === userSub ? 'pink' : 'blue'

  return (
    <Pill
      bg={color}
      justifyContent="center"
      alignItems="center"
      p={1}
      key={participant.id}
    >
      <Text px={1} fontSize={10} color="white">
        {participant.nickname}
      </Text>
    </Pill>
  )
}

const renderLogin = (onClick?: () => void, user?: ILocalUser) => {
  if (user) {
    return null
  }
  if (!onClick) {
    return null
  }
  return (
    <Button m={2} onClick={onClick}>
      Kirjaudu
    </Button>
  )
}

const EventCard: FunctionComponent<IProps> = (props: IProps) => {
  const {
    address,
    id,
    creator,
    date,
    description,
    eventImage,
    isJoining,
    joinEvent,
    onDeleteClick,
    onViewClick,
    onEditClick,
    participants,
    subtitle,
    time,
    title,
    type,
    user,
    race,
    stayOpened,
    onGotoLogin,
  } = props

  const userGoesToEvent = user ? isParticipant(user, participants) : false

  const onJoinClick = (e: any) => {
    if (!user) {
      toast.info('Et ole kirjautunut sisään')
      return
    }
    e.stopPropagation()
    if (joinEvent) {
      joinEvent(id)
    }
  }
  const raceElem = race ? <Race /> : null

  const exposeDetails = (e: any) => {
    e.stopPropagation()
    if (!stayOpened) {
      setShowDetails(!showDetails)
    }
  }

  const viewClick = () => {
    if (onViewClick) {
      onViewClick(id)
    }
  }

  const [showDetails, setShowDetails] = useState(stayOpened)
  const [disableDelete, setDisableDelete] = useState(true)

  const toggleOpenButton = !stayOpened ? (
    <DownArrow pointDown={!showDetails} onClick={exposeDetails} />
  ) : null

  return (
    <PortalWithState closeOnEsc={true}>
      {({ openPortal, closePortal, portal }) => {
        const editClick = () => {
          if (onEditClick) {
            onEditClick(id)
          }
        }
        const deleteClick = () => {
          if (onDeleteClick) {
            onDeleteClick(id)
            closePortal()
          }
        }

        return (
          <React.Fragment>
            {renderLogin(onGotoLogin, user)}

            <Flex
              m={1}
              bg="white"
              width="100%"
              sx={{
                maxWidth: 400,
                borderBottom: borderStyle,
                position: 'relative',
              }}
            >
              <Card width="100%" mx="auto" variant="shadow">
                <ImageBox
                  bgImage={eventImage || type.defaultImage}
                  onClick={viewClick}
                >
                  <Flex
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    height={30}
                    pr={2}
                    sx={{
                      gridArea: 'header',
                      borderRadius: '15px 15px 0 0',
                      backgroundImage:
                        'linear-gradient(0deg, rgba(0,0,0,0.0), rgba(0,0,0,0.5))',
                    }}
                  >
                    <Flex ml={2}>{toggleOpenButton}</Flex>
                    <EditBtn onClick={openPortal} />
                  </Flex>

                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    sx={{ gridArea: 'title' }}
                  >
                    <Text
                      letterSpacing={4}
                      color="white"
                      fontSize={30}
                      fontWeight={900}
                      sx={{
                        textShadow: '2px 2px 5px black',
                      }}
                    >
                      {type.title}
                    </Text>
                    {raceElem}
                  </Flex>

                  <Text
                    fontSize={11}
                    fontFamily="monospace"
                    p={1}
                    color="white"
                    width="100%"
                    textAlign="right"
                    sx={{
                      backgroundImage:
                        'linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.6))',
                      gridArea: 'creator',
                    }}
                  >
                    by {creator}
                  </Text>
                </ImageBox>
                <Flex
                  p={2}
                  bg="darkWhite"
                  justifyContent="space-between"
                  sx={{
                    border: borderStyle,
                    borderTop: 0,
                    borderBottom: 0,
                  }}
                >
                  <Flex justifyContent="space-around" flexDirection="column">
                    <Text fontSize={20} fontWeight="bold">
                      {title}
                    </Text>
                    <Text fontSize={16} fontWeight="bold">
                      {subtitle}
                    </Text>
                    <Text mt={1} fontSize={16}>
                      {date}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" justifyContent="center">
                    <HeadCountButton
                      loading={isJoining}
                      count={participants.length}
                      onClick={onJoinClick}
                      isParticipant={userGoesToEvent}
                    />
                  </Flex>
                </Flex>
                <AnimateHeight
                  duration={ANIM_TIME}
                  height={showDetails ? 'auto' : 0}
                >
                  <Box
                    px={2}
                    pt={1}
                    bg="darkWhite"
                    sx={{
                      borderLeft: borderStyle,
                      borderRight: borderStyle,
                    }}
                  >
                    <Flex>
                      <Text fontWeight="bold" color="lightBlack" width={60}>
                        Sijainti:
                      </Text>
                      <Text ml={1} color={address ? 'black' : 'lightgrey'}>
                        {address || 'ei määritelty'}
                      </Text>
                    </Flex>
                    <Flex my={1}>
                      <Text fontWeight="bold" color="lightBlack" width={60}>
                        Aika:
                      </Text>
                      <Text ml={1} color={time ? 'black' : 'lightgrey'}>
                        {time || 'ei määritelty'}
                      </Text>
                    </Flex>
                    <Flex flexWrap="wrap" py={1}>
                      {map(renderPill(user), participants)}
                    </Flex>
                    <Text fontWeight="bold" color="lightBlack" width={60}>
                      Kuvaus:
                    </Text>
                    <Text
                      py={2}
                      ml={1}
                      color={description ? 'black' : 'lightgrey'}
                    >
                      {parse(description || 'ei määritelty', {
                        replace: (domNode: DomElement): any => {
                          const { name, children } = domNode
                          if (!children) {
                            return ''
                          }

                          if (name === 'em') {
                            return (
                              <Text as="span" sx={{ fontStyle: 'italic' }}>
                                {domToReact(children)}
                              </Text>
                            )
                          }
                          if (name === 'strong') {
                            return (
                              <Text as="span" fontWeight="bold">
                                {domToReact(children)}
                              </Text>
                            )
                          }
                          if (name === 'u') {
                            return (
                              <Text as="span" sx={{ fontStyle: 'underline' }}>
                                {domToReact(children)}
                              </Text>
                            )
                          }
                          if (name === 'h1') {
                            return (
                              <Heading fontSize={4}>
                                {domToReact(children)}
                              </Heading>
                            )
                          }
                          if (name === 'ul') {
                            return (
                              <Text p={1} sx={{ listStyleType: 'circle' }}>
                                {domToReact(children)}
                              </Text>
                            )
                          }
                          if (name === 'ol') {
                            return (
                              <Text p={1} sx={{ listStyleType: 'lower-latin' }}>
                                {domToReact(children)}
                              </Text>
                            )
                          }
                        },
                      })}
                    </Text>
                  </Box>
                </AnimateHeight>
              </Card>
            </Flex>
            {portal(
              <PortalOverlay onClick={closePortal}>
                <Flex
                  // tslint:disable-next-line: jsx-no-lambda
                  onClick={(e) => e.stopPropagation()}
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
                  <Text fontWeight="bold">Nimi: {title} </Text>
                  <Text mb={2}>Valitse seuraavista</Text>
                  <Button
                    onClick={editClick}
                    variant="secondary"
                    my={2}
                    width="100%"
                  >
                    Muokkaa tapahtumaa
                  </Button>
                  <Flex alignItems="center" justifyContent="center">
                    <Text mr={2} fontWeight="bold" fontSize={3} color="red">
                      POISTA
                    </Text>
                    <Switch
                      offColor={colors.lightRed}
                      onColor={colors.red}
                      offHandleColor={colors.white}
                      onHandleColor={colors.white}
                      // tslint:disable-next-line: jsx-no-lambda
                      onChange={() => {
                        setDisableDelete(!disableDelete)
                      }}
                      checked={!disableDelete}
                    />
                  </Flex>
                  <Button
                    onClick={deleteClick}
                    variant="warn"
                    disabled={disableDelete}
                    my={2}
                    width="100%"
                  >
                    Varmista poisto
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

export default EventCard
