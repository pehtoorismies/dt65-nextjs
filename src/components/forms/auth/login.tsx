import { Field, Form, FormikProps } from 'formik'
import React, { FunctionComponent } from 'react'
import { Flex } from 'rebass'
import * as Yup from 'yup'
import { AuthFormProps, FormProps } from '../../../types'
import { BasicInput, Button } from '../../common'
import { BaseForm } from './base-form'

interface FormValues {
  email: string
  password: string
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
          name="password"
          type="password"
          placeholder="Salasana*"
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
          Kirjaudu
        </Button>
      </Flex>
    </Form>
  )
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Tarkista sähköposti')
    .required('Pakollinen kenttä'),
  password: Yup.string().required('Pakollinen kenttä'),
})
const initialValues = {
  email: '',
  password: '',
}

export const Login: FunctionComponent<AuthFormProps> = (
  props: AuthFormProps
) => {
  const formProps: FormProps = {
    validationSchema,
    render,
    initialValues,
  }

  return (
    <BaseForm {...props} heading="KIRJAUDU" formProps={formProps}>
      {props.children}
    </BaseForm>
  )
}
