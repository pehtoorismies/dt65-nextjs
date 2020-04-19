import { LoaderAlt } from '@styled-icons/boxicons-regular/LoaderAlt'
import { User } from '@styled-icons/boxicons-regular/User'
import React, { Fragment, FunctionComponent, MouseEvent } from 'react'
import { Flex, Text, FlexProps } from 'rebass/styled-components'
import styled, { keyframes } from 'styled-components'

interface Props {
  count: number
  onClick: Function
  isParticipant: boolean
  loading?: boolean
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const UserIcon = styled(User)`
  width: 2rem;
  height: 2rem;
  color: white;
`

const LoaderIcon = styled(LoaderAlt)`
  width: 2.6rem;
  height: 2.6rem;
  animation: ${rotate} 1s linear infinite;
  color: white;
`

type CountProps = {
  onClick: MouseEvent<HTMLElement>
}

const Count = (props: CountProps & FlexProps) => (
  <Flex
    onClick={props.onClick}
    {...props}
    width={55}
    height={55}
    sx={{
      borderRadius: 50,
      border: '0.2rem solid white',
      cursor: 'pointer',
    }}
  />
)

const getContent = (count: number, loading?: boolean) => {
  if (loading) {
    return <LoaderIcon />
  }
  return (
    <Fragment>
      <UserIcon />
      <Text fontSize={18} color="white" fontWeight="600">
        {count}
      </Text>
    </Fragment>
  )
}

export const HeadCountButton: FunctionComponent<Props> = (props: Props) => {
  const { count, onClick, isParticipant, loading } = props

  const content = getContent(count, loading)
  const clicked = loading ? null : onClick

  return (
    <Count
      onClick={clicked}
      bg={isParticipant ? 'pink' : 'blue'}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {content}
    </Count>
  )
}
