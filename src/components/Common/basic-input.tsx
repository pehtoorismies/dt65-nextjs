import { Input } from '@rebass/forms'
import { FieldConfig, FieldProps } from 'formik'
import React, { Fragment, FunctionComponent } from 'react'
import { ErrorText } from '.'

type CustomInput = FieldConfig &
  FieldProps & {
    placeholder: string
    autocomplete?: string
  }

export const BasicInput: FunctionComponent<CustomInput> = (
  props: CustomInput
) => {
  const {
    field,
    form: { touched, errors },
    type,
    placeholder,
    autocomplete,
  } = props

  const hasError = touched[field.name] && errors[field.name]
  const style = hasError ? 'primary-error' : 'primary'
  return (
    <Fragment>
      <Input
        {...field}
        placeholder={placeholder}
        my={1}
        variant={style}
        type={type}
        autocomplete={autocomplete}
      />
      {touched[field.name] && errors[field.name] && (
        <ErrorText my={1}>{errors[field.name]}</ErrorText>
      )}
    </Fragment>
  )
}
