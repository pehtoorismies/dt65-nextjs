import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import { Flex } from 'rebass'
import * as Yup from 'yup'
import { AuthFormProps, FormProps } from '../../../types'
import { BasicInput, Button } from '../../common'
import { BaseForm } from './base-form'

interface FormValues {
  email: string
  nickname: string
  password: string
  name: string
  registerSecret: string
}

const render = (formikBag: FormikProps<FormValues>) => {
  const { isSubmitting } = formikBag

  return (
    <Form>
      <Flex flexDirection="column" alignItems="center">
        <Field
          width="100%"
          name="email"
          placeholder="Sähköpostiosoite*"
          component={BasicInput}
        />
        <Field
          width="100%"
          name="nickname"
          placeholder="Käyttäjätunnus / Nick*"
          component={BasicInput}
        />
        <Field
          width="100%"
          name="password"
          type="password"
          placeholder="Salasana*"
          component={BasicInput}
        />
        <Field
          width="100%"
          name="name"
          placeholder="Etunimi Sukunimi*"
          component={BasicInput}
        />
        <Field
          width="100%"
          name="registerSecret"
          placeholder="Saamasi rekisteröintikoodi*"
          component={BasicInput}
        />
        <Button
          width="100%"
          variant="primary"
          m={2}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Rekisteröidy
        </Button>
      </Flex>
    </Form>
  )
}
// .min(4, `Minini pituus on 4 kirjainta`)
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Tarkista sähköposti')
    .required('Pakollinen kenttä'),
  nickname: Yup.string()
    .min(3, 'Nick on liian lyhyt')
    .max(15, 'Nick on liian pitkä')
    .required('Pakollinen kenttä'),
  password: Yup.string()
    .min(8, 'Salasana on liian lyhyt')
    .required('Pakollinen kenttä'),
  name: Yup.string().required('Pakollinen kenttä'),
  registerSecret: Yup.string().required('Pakollinen kenttä'),
})
const initialValues = {
  email: '',
  nickname: '',
  password: '',
  name: '',
  registerSecret: '',
}

export const Register = (props: AuthFormProps) => {
  const formProps: FormProps = {
    validationSchema,
    render,
    initialValues,
  }

  return (
    <BaseForm {...props} heading="REKISTERÖIDY" formProps={formProps}>
      {props.children}
    </BaseForm>
  )
}
