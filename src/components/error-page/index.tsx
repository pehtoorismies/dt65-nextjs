import React, { FunctionComponent } from 'react'
import { Flex, Image, Text } from 'rebass'
import fingerUp from '../../images/fingerUp.jpg'
import { colors } from '../../styles/theme'
import { Button } from '../common'

interface Props {
  message?: string
  title?: string
  buttonTitle?: string
  onGetMeOut: () => void
}

export const ErrorPage: FunctionComponent<Props> = ({
  message = 'Sisältöä ei löytynyt',
  title = 'PUMMI',
  onGetMeOut,
  buttonTitle = 'Poistu',
}: Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Text
        fontWeight="bold"
        fontSize={[5, 6, 7]}
        textAlign="center"
        lineHeight={1.5}
        p={3}
      >
        {title}
      </Text>
      <Image
        src={fingerUp}
        sx={{
          width: ['80%', '50%'],
          borderRadius: '50%',
          border: `6px solid ${colors.pink}`,
        }}
      />
      <Text textAlign="center" lineHeight={1.5} p={3}>
        {message}
      </Text>
      <Button onClick={onGetMeOut}>{buttonTitle}</Button>
    </Flex>
  )
}
