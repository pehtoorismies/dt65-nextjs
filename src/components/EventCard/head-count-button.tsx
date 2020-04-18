import { LoaderAlt } from '@styled-icons/boxicons-regular/LoaderAlt'
import { User } from '@styled-icons/boxicons-regular/User'
import React, { Fragment, FunctionComponent } from 'react'
import { Flex, Text } from 'rebass/styled-components'
import styled, { keyframes } from 'styled-components'

interface IProps {
  count: number
  onClick: any
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
  width: 20px;
  height: 20px;
  color: white;
`

const LoaderIcon = styled(LoaderAlt)`
  width: 26px;
  height: 26px;
  animation: ${rotate} 1s linear infinite;
  color: white;
`

const Count = (props: any) => (
  <Flex
    {...props}
    width={55}
    height={55}
    sx={{
      borderRadius: 50,
      border: '2px solid white',
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
      <Text fontSize={18} color="white" fontWeight="bold">
        {count}
      </Text>
    </Fragment>
  )
}

const HeadCountButton: FunctionComponent<IProps> = (props: IProps) => {
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

export default HeadCountButton
