import React from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import { BaseUserInfo } from '../../types'

interface Props {
  users: BaseUserInfo[]
}

const renderUser = (user: BaseUserInfo, idx: number) => {
  const odd = idx % 2 === 1
  return (
    <Flex
      key={user.id}
      bg={odd ? 'white' : '#fbe5f7'}
      py={3}
      px={2}
      color="standardBlack"
      sx={{ borderBottom: '1px solid #eee' }}
    >
      <Text fontFamily="monospace" width={150}>
        {user.nickname}
      </Text>
      <Text
        textAlign="left"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {user.name}
      </Text>
    </Flex>
  )
}

const UserList = ({ users }: Props) => {
  return (
    <Box width="100%" p={3}>
      <Flex width="100%" mt={2} px={2} bg="blue" color="white" py={3}>
        <Text width={150}>käyttäjätunnus</Text>
        <Text>nimi</Text>
      </Flex>
      <Flex width="100%" flexDirection="column">
        {users.map(renderUser)}
      </Flex>
    </Box>
  )
}

export default UserList
