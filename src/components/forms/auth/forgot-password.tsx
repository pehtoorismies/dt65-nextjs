import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import { Flex } from 'rebass/styled-components'
import * as Yup from 'yup'
import { AuthFormProps, FormProps } from '../../../types'
import { BasicInput, Button } from '../../common'
import { BaseForm } from './base-form'

interface FormValues {
  email: string
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

        <Button
          width="100%"
          variant="primary"
          my={2}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Lähetä linkki
        </Button>
      </Flex>
    </Form>
  )
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Tarkista muoto').required('Pakollinen kenttä'),
})
const initialValues = {
  email: '',
}

export const ForgotPassword = (props: AuthFormProps) => {
  const formProps: FormProps = {
    validationSchema,
    render,
    initialValues,
  }
  return (
    <BaseForm {...props} heading="UNOHTUNUT SALASANA" formProps={formProps}>
      {props.children}
    </BaseForm>
  )
}
