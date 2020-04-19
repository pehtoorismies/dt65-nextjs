import { Field, Form, Formik, FormikProps } from 'formik'
import React, { FunctionComponent } from 'react'
import { Box, Flex, Text, TextProps } from 'rebass/styled-components'
import * as Yup from 'yup'
import { EventStep } from '../../../types'
import { EventInput, LeftArrowButton, RightArrowButton } from '../../common'
import { BaseStep } from './base-step'

interface Props extends EventStep {
  title?: string
  subtitle?: string
  setTitles: (title?: string, subtitle?: string) => void
}

interface TitleFormValues {
  title?: string
  subtitle?: string
}

const HintText = (props: TextProps) => (
  <Text {...props} fontSize={1} mb={1} fontFamily="monospace" css="" />
)

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Vähintään 3 kirjainta')
    .max(30, 'Enintään 25 kirjainta')
    .required('Anna tapahtuman nimi'),
  subtitle: Yup.string()
    .test('min', 'Vähintään 3 kirjainta', (value: string) => {
      if (!value) {
        return true
      }
      return value.length > 2
    })
    .test('max', 'Enintään 25 kirjainta', (value: string) => {
      if (!value) {
        return true
      }
      return value.length <= 25
    }),
})

export const TitleStep: FunctionComponent<Props> = ({
  title,
  subtitle,
  setTitles,
  toPrevStep,
  toNextStep,
}: Props) => {
  const onSubmit = (values: TitleFormValues) => {
    setTitles(values.title, values.subtitle)
    toNextStep()
  }

  const renderForm = ({
    isValid,
    values,
    submitForm,
  }: FormikProps<TitleFormValues>) => {
    const onLeftClick = () => {
      setTitles(values.title, values.subtitle)
      toPrevStep()
    }

    return (
      <Flex flexDirection="column" width="100%" p={2}>
        <Form>
          <Box py={3}>
            <Field
              width="100%"
              name="title"
              placeholder="Tapahtuman nimi*"
              component={EventInput}
            />
          </Box>
          <Box py={3}>
            <Field
              width="100%"
              name="subtitle"
              placeholder="Mahdollinen tarkenne"
              component={EventInput}
            />
          </Box>
          <Box
            p={2}
            bg="lightestgrey"
            sx={{ border: '3px solid lightgrey', borderRadius: '4px' }}
            width="70%"
            alignSelf="center"
          >
            <HintText>Esimerkki</HintText>
            <Flex>
              <HintText fontWeight="600">Nimi:</HintText>
              <HintText>Tempoajo </HintText>
            </Flex>
            <Flex>
              <HintText fontWeight="600">Tarkenne:</HintText>
              <HintText>Seuran mestaruus </HintText>
            </Flex>
          </Box>
          <Flex
            my={4}
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <LeftArrowButton
              type="button"
              onClick={onLeftClick}
              visible={true}
            />
            <RightArrowButton
              type="button"
              onClick={submitForm}
              visible={isValid}
            />
          </Flex>
        </Form>
      </Flex>
    )
  }
  const initialValues = { title: title || '', subtitle: subtitle || '' }

  return (
    <BaseStep title="Anna tapahtumalle nimi">
      <Flex justifyContent="center" alignSelf="center">
        <Formik
          isInitialValid={validationSchema.isValidSync(initialValues)}
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={renderForm}
        />
      </Flex>
    </BaseStep>
  )
}
