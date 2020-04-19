import { Formik, FormikHelpers } from 'formik'
import React, { PropsWithChildren } from 'react'
import { Box, Flex, Heading, Text } from 'rebass'
import { FormProps } from '../../../types'

interface Props {
  onSubmit: <Values>(
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<{}>
  errorMessage?: string
  heading: string
  formProps: FormProps
}

const renderError = (errorMessage?: string) => {
  if (!errorMessage) {
    return null
  }
  return (
    <Box p={2} my={1} width="100%" alignSelf="center">
      <Text textAlign="center" color="red">
        {errorMessage}
      </Text>
    </Box>
  )
}

export const BaseForm = ({
  heading,
  formProps,
  onSubmit,
  errorMessage,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Flex width="100%" alignItems="center" flexDirection="column">
      <Box width={['100%', 400, 400]}>
        <Heading py={3} color="black" textAlign="center" fontWeight={700}>
          {heading}
        </Heading>
        {renderError(errorMessage)}
        <Formik {...formProps} onSubmit={onSubmit} />
        {children}
      </Box>
    </Flex>
  )
}
