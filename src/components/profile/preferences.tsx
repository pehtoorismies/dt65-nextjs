import deepEqual from 'deep-equal'
import { assoc, map } from 'ramda'
import React, { Fragment, useState } from 'react'
import Switch from 'react-switch'
import { Flex, Heading, Text } from 'rebass/styled-components'
import styled from 'styled-components'
import { colors } from '../../styles/theme'
import { Preferences as PreferencesType } from '../../types'
import { Button } from '../common'

interface Props {
  preferences: PreferencesType
  loading: boolean
  // TODO: proper signature
  onUpdate: (preferences: PreferencesType) => void
  onSave?: () => void
}

interface RenderProps {
  text: string
  key: string
  value: boolean
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 80px;
  grid-template-rows: auto;
  align-items: center;
`

const renderPreference = (onChange: (key: string, value: boolean) => void) => (
  rp: RenderProps
) => {
  const { text, key, value } = rp
  const weight = value ? '600' : 'normal'
  const color = value ? 'darkGray' : 'lightgray'

  const onSwitchChange = () => {
    onChange(key, !value)
  }

  return (
    <Grid key={key}>
      <Flex py={2}>
        <Text ml={2} fontSize={[2, 3, 4]} color={color} fontWeight={weight}>
          {text}
        </Text>
      </Flex>
      <Flex py={2} my={1} alignItems="center" justifyContent="center">
        <Switch
          offColor={colors.blue}
          onColor={colors.pink}
          offHandleColor={colors.white}
          onHandleColor={colors.white}
          onChange={onSwitchChange}
          checked={value}
        />
      </Flex>
    </Grid>
  )
}

export const Preferences = ({ preferences, onUpdate, loading }: Props) => {
  const [prefs, setPrefs] = useState<PreferencesType>(preferences)

  const disabled = deepEqual(preferences, prefs)

  const prefsRows: RenderProps[] = [
    {
      key: 'subscribeEventCreationEmail',
      text: '  Lähetä sähköposti, kun uusi tapahtuma luodaan.',
      value: prefs.subscribeEventCreationEmail,
    },
    {
      key: 'subscribeWeeklyEmail',
      text: 'Lähetä viikon tapahtumat sähköpostitse.',
      value: prefs.subscribeWeeklyEmail,
    },
  ]

  const updatePreferences = (key: string, value: boolean) => {
    const newState = assoc(key, value, prefs)
    setPrefs(newState)
  }

  const submit = () => {
    onUpdate(prefs)
  }

  return (
    <Fragment>
      <Heading my={3}>Asetukset</Heading>
      <Flex width="100%" flexDirection="column">
        {map(renderPreference(updatePreferences), prefsRows)}
      </Flex>
      <Button
        disabled={Boolean(disabled || loading)}
        isLoading={loading}
        onClick={submit}
      >
        Tallenna
      </Button>
    </Fragment>
  )
}
