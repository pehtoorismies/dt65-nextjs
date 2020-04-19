import gql from 'graphql-tag'

const EventMutablePropsFragment = gql`
  fragment MutableProps on Event {
    id
    exactTime
    date
    description
    race
    subtitle
    title
    type
  }
`

const EventAllFragment = gql`
  fragment AllEvent on Event {
    updatedAt
    participants {
      sub
      nickname
      id
    }
    creator {
      sub
      nickname
      id
    }
    ...MutableProps
  }
  ${EventMutablePropsFragment}
`

const PreferencesFragment = gql`
  fragment AllPreferences on User {
    id
    preferences {
      subscribeEventCreationEmail
      subscribeWeeklyEmail
    }
  }
`

export const GET_HEADER_TITLE = gql`
  query HeaderTitle {
    headerTitle @client
  }
`

export const SET_HEADER_TITLE = gql`
  mutation HeaderTitle($headerTitle: String!) {
    headerTitle(headerTitle: $headerTitle) @client
  }
`

export const GET_BACK_URL = gql`
  query BackUrl {
    backUrl @client
  }
`

export const GET_LOCALUSER = gql`
  query LocalUser {
    localUser @client {
      nickname
      picture
      sub
      name
    }
  }
`

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      nickname
      name
    }
  }
`

export const GET_EVENT_VIEW = gql`
  query EventsView {
    eventsView @client
  }
`

export const UPDATE_PREFERENCES_MUTATION = gql`
  mutation UpdatePreferences(
    $subscribeEventCreationEmail: Boolean!
    $subscribeWeeklyEmail: Boolean!
  ) {
    updateMyPreferences(
      subscribeEventCreationEmail: $subscribeEventCreationEmail
      subscribeWeeklyEmail: $subscribeWeeklyEmail
    ) {
      ...AllPreferences
    }
  }
  ${PreferencesFragment}
`

export const PREFERENCES_QUERY = gql`
  query MyPreferences {
    me {
      ...AllPreferences
    }
  }
  ${PreferencesFragment}
`

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      nickname
    }
  }
`

export const ME_MUTATION = gql`
  mutation UpdateMe($name: String, $nickname: String) {
    updateMe(name: $name, nickname: $nickname) {
      id
      name
      email
      nickname
    }
  }
`

export const EVENTS_QUERY = gql`
  query FindEvents($limit: Int) {
    findManyEvents(limit: $limit) {
      ...AllEvent
    }
  }
  ${EventAllFragment}
`

export const EVENT_QUERY = gql`
  query FindEvent($id: ID!) {
    findEvent(id: $id) {
      ...AllEvent
    }
  }
  ${EventAllFragment}
`

export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

export const TOGGLE_JOIN_EVENT = gql`
  mutation ToggleJoinEvent($id: ID!) {
    toggleJoinEvent(id: $id) {
      id
      participants {
        sub
        nickname
        id
      }
    }
  }
`

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $addMe: Boolean!
    $date: String!
    $description: String
    $race: Boolean!
    $exactTime: Boolean!
    $subtitle: String
    $title: String!
    $type: String!
  ) {
    createEvent(
      addMe: $addMe
      event: {
        date: $date
        description: $description
        race: $race
        subtitle: $subtitle
        exactTime: $exactTime
        title: $title
        type: $type
      }
    ) {
      ...AllEvent
    }
  }
  ${EventAllFragment}
`

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $date: String!
    $description: String
    $race: Boolean!
    $exactTime: Boolean!
    $subtitle: String
    $title: String!
    $type: String!
  ) {
    updateEvent(
      id: $id
      event: {
        date: $date
        description: $description
        race: $race
        subtitle: $subtitle
        exactTime: $exactTime
        title: $title
        type: $type
      }
    ) {
      ...MutableProps
    }
  }
  ${EventMutablePropsFragment}
`
