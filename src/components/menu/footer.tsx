import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Flex } from 'rebass/styled-components'
import { Home } from '@styled-icons/boxicons-solid/Home'
import { PlusSquare } from '@styled-icons/boxicons-solid/PlusSquare'
import { User } from '@styled-icons/boxicons-solid/User'
import { Users } from '@styled-icons/icomoon/Users'
import { Menubar } from './menubar'

const dimensions = {
  width: 26,
  height: 26,
}

interface Props {
  onHomeClick: () => void
  onProfileClick: () => void
  onAddEventClick: () => void
  onUserListClick: () => void
}

const common = css`
  color: black;
`

const HomeIcon = styled(Home)`
  ${common};
`

const ProfileIcon = styled(User)`
  ${common};
`

const AddIcon = styled(PlusSquare)`
  ${common};
`

const UsersIcon = styled(Users)`
  ${common};
`

export const Footer = (props: Props) => {
  const {
    onHomeClick,
    onProfileClick,
    onAddEventClick,
    onUserListClick,
  } = props

  return (
    <Menubar isFixedTop={false}>
      <Flex justifyContent="space-between" width="100%" mx={3}>
        <HomeIcon {...dimensions} onClick={onHomeClick} />
        <AddIcon {...dimensions} onClick={onAddEventClick} />
        <UsersIcon {...dimensions} onClick={onUserListClick} />
        <ProfileIcon {...dimensions} onClick={onProfileClick} />
      </Flex>
    </Menubar>
  )
}
