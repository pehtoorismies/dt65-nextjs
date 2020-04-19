import { Field, Form, Formik, FormikProps, FormikHelpers } from 'formik'
import React, { Fragment } from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import * as Yup from 'yup'
import { UpdateableUserInfo, UserInfo as UserInfoType } from '../../types'
import { BasicInput, Button } from '../common'

interface Props {
  userInfo: UserInfoType
  onSubmit: (
    values: UpdateableUserInfo,
    setSubmitting: (submitting: boolean) => void
  ) => void
}

interface RowProps {
  title: string
  value: string
}

const Row = ({ title, value }: RowProps) => {
  return (
    <Flex width="100%" flexDirection="column" my={2} bg="darkWhite" p={2}>
      <Text my={1} color="lightgray">
        {title}
      </Text>
      <Text color="standardBlack">{value}</Text>
    </Flex>
  )
}
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Pakollinen kenttä'),
  nickname: Yup.string()
    .min(3, 'Nick on liian lyhyt')
    .max(15, 'Nick on liian pitkä')
    .required('Pakollinen kenttä'),
})

const render = (formikBag: FormikProps<UpdateableUserInfo>) => {
  const {
    isSubmitting,
    initialValues,
    values: formValues,
    handleReset,
  } = formikBag

  const renderWarning =
    initialValues.nickname !== formValues.nickname ? (
      <Text fontSize={1} bg="red" color="white" m={2} p={2}>
        Huom! Nickin vaihto vaatii uloskirjautumisen. Jos vaihdat nickiä sinut
        kirjataan ulos vaihdon jälkeen.
      </Text>
    ) : null

  return (
    <Form>
      <Flex flexDirection="column" width="100%">
        {renderWarning}
        <Text>Nimi:</Text>
        <Field
          width="100%"
          name="name"
          placeholder="Etunimi Sukunimi*"
          component={BasicInput}
        />
        <Text>Nick:</Text>
        <Field
          width="100%"
          name="nickname"
          placeholder="Nickname*"
          component={BasicInput}
        />

        <Button
          width="100%"
          variant="primary"
          mt={2}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Tallenna muutokset
        </Button>
        <Button
          type="button"
          variant="secondary"
          width="100%"
          my={2}
          onClick={handleReset}
        >
          Peru muutokset
        </Button>
      </Flex>
    </Form>
  )
}

export const UserInfo = (props: Props) => {
  const { userInfo, onSubmit } = props

  const { name, email, nickname } = userInfo

  const onSubmitEvent = (
    updatedValues: UpdateableUserInfo,
    actions: FormikHelpers<UpdateableUserInfo>
  ) => {
    onSubmit(updatedValues, actions.setSubmitting)
  }

  return (
    <Fragment>
      <Box m={2} px={2} width="100%">
        <Text>Käyttäjäinfo:</Text>
        <Text fontSize={1} my={1}>
          Jos haluat muuttaa sähköpostia, lähetä postia hello@downtown65.com
        </Text>
        <Row title="Sähköposti" value={email} />
      </Box>
      <Box width="100%" px={2}>
        <Formik
          initialValues={{ name, nickname }}
          onSubmit={onSubmitEvent}
          validationSchema={validationSchema}
          render={render}
        />
      </Box>
    </Fragment>
  )
}
