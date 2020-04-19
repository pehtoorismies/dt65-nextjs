import { ReactNode } from 'react'

export enum EventType {
  Cycling = 1,
  Karonkka,
  Meeting,
  NordicWalking,
  Orienteering,
  Other,
  Running,
  Skiing,
  Spinning,
  Swimming,
  TrackRunning,
  TrailRunning,
  Triathlon,
  Ultras,
}

export enum ErrorType {
  Redirect = 1,
  Network,
  Severe,
}

export enum VIEW {
  CALENDAR = 1,
  LIST = 2,
}

export type ID = number | string

export interface HandleError {
  type: ErrorType
  message: string
}

export interface AuthResponse {
  valid: boolean
  errorMessage?: string
}

export interface EventTypeDescriptor {
  defaultImage: string
  title: string
  id: EventType
  apiType: string
}
export interface FormProps {
  initialValues: any
  render: (formikBag: any) => any
  validationSchema: any
}

export interface AuthFormProps {
  onSubmit: (value: any, actions: any) => any
  errorMessage?: string
  children?: ReactNode
}

export interface Subject {
  sub: string
}

export interface User extends Subject {
  id: string
  nickname: string
  __typename?: string
  username?: string
}

export interface Time {
  hour: number
  minute: number
}
export interface EventState {
  date?: Date
  description?: string
  creatorJoining: boolean
  race?: boolean
  subtitle?: string
  time: Time
  timeEnabled: boolean
  title?: string
  type?: EventType
  participants?: User[]
}

export interface EventStep {
  toPrevStep: any
  toNextStep: any
}

export interface EventBase {
  address?: string
  description?: string
  race: boolean
  subtitle?: string
  title: string
}

export interface EventReq extends EventBase {
  date: string
  type: string
  creatorJoining: boolean
  exactTime: boolean
}

export interface EventResp extends EventBase {
  id: ID
  date: string
  exactTime: boolean
  type: string
  participants: User[]
  creator: User
  updatedAt?: string
  createdAt?: string
  __typename?: string
}

export interface Event extends EventBase {
  id: ID
  date: string
  time: string
  participants: User[]
  type: EventTypeDescriptor
  creator: string
}

export interface EventExtended extends Event {
  isoDate: string
}

interface Response {
  error?: {
    name: string
    message: string
  }
}

export interface CreateEventResponse extends Response {
  event?: Event
}

export interface Preferences {
  subscribeEventCreationEmail: boolean
  subscribeWeeklyEmail: boolean
}

export interface YearMonth {
  year: number
  monthIndex: number
}

export interface CalEvent {
  date: Date
  type: EventType
}

export interface BaseUserInfo {
  id: ID
  nickname: string
  name: string
  avatar?: string
}

export interface LocalUser extends Subject {
  __typename?: string
  nickname: string
  picture: string
  name: string
}

export interface UserInfo extends BaseUserInfo {
  email: string
}

export interface UpdateableUserInfo {
  nickname: string
  name: string
}
