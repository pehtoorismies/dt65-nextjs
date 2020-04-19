import { Input } from '@rebass/forms'
import { FieldConfig, FieldProps } from 'formik'
import React, { Fragment, FunctionComponent } from 'react'
import { ErrorText } from '.'

type CustomInput = FieldConfig &
  FieldProps & {
    placeholder: string
  }

const EventInput: FunctionComponent<CustomInput> = (props: CustomInput) => {
  const {
    field,
    form: { touched, errors },
    type,
    placeholder,
  } = props

  const hasError = touched[field.name] && errors[field.name]
  const style = hasError ? 'event-error' : 'event'
  return (
    <Fragment>
      <Input
        {...field}
        placeholder={placeholder}
        my={1}
        variant={style}
        type={type}
      />
      {touched[field.name] && errors[field.name] && (
        <ErrorText my={1}>{errors[field.name]}</ErrorText>
      )}
    </Fragment>
  )
}

export default EventInput
