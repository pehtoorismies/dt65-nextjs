import { UserInjured } from '@styled-icons/fa-solid/UserInjured'
import { StyledIcon } from '@styled-icons/styled-icon'
import React from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import styled from 'styled-components'
import { colors } from '../../styles/theme'
import { ArrowButton } from '../common'

interface Button {
  id: string | number
  title: string
  icon: StyledIcon
  onClick(): void
}

interface Props {
  profileUrl?: string
  nickname: string
  buttons: Button[]
}

const ProfileIcon = styled(UserInjured)`
  color: grey;
  height: 30px;
  width: 30px;
  background: white;
  border-radius: 15px;
`

const PictureIcon = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid ${colors.pink};
`

const getProfileCmp = (profileUrl?: string) => {
  if (!profileUrl) {
    return <ProfileIcon />
  }
  return <PictureIcon src={profileUrl} />
}

export const Profile = ({ buttons, profileUrl, nickname }: Props) => {
  const Icon = getProfileCmp(profileUrl)

  return (
    <Box width="100%" sx={{ maxWidth: '500px' }}>
      <Flex
        width="100%"
        p={3}
        bg="lightestgray"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {Icon}
        <Text
          fontWeight="600"
          color="black"
          textAlign="center"
          lineHeight={1.5}
          p={1}
        >
          {nickname}
        </Text>
      </Flex>
      <Box width="100%">
        {buttons.map((b: Button) => (
          <ArrowButton
            key={b.id}
            title={b.title}
            onClick={b.onClick}
            icon={b.icon}
          />
        ))}
      </Box>
    </Box>
  )
}
