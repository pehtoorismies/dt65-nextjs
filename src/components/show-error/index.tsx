import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Flex, Text, Image } from 'rebass/styled-components'
import { Button } from '../common'
import kakkaGif from './kakka.gif'

interface Props extends FallbackProps {
  onGetMeOut: () => void
}

const ShowError = ({ onGetMeOut }: Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Text
        fontWeight="bold"
        fontSize={[5, 6, 7]}
        textAlign="center"
        lineHeight={1.5}
        p={3}
      >
        Virhus.
      </Text>
      <Text fontSize={[2, 3, 4]} textAlign="center" lineHeight={1.5} p={3}>
        Joku meni vituiks. Palaillaan asiaan.
      </Text>
      <Image src={kakkaGif} />
      <Button onClick={onGetMeOut}>POISTU</Button>
    </Flex>
  )
}

export default ShowError
