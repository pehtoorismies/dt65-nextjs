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

// tslint:disable-next-line: interface-over-type-literal
export type ID = number | string

export interface IHandleError {
  type: ErrorType
  message: string
}

export interface IAuthResponse {
  valid: boolean
  errorMessage?: string
}

export interface IEventTypeDescriptor {
  defaultImage: string
  title: string
  id: EventType
  apiType: string
}
export interface IFormProps {
  initialValues: any
  render: (formikBag: any) => any
  validationSchema: any
}

export interface IAuthFormProps {
  onSubmit: (value: any, actions: any) => any
  errorMessage?: string
  children?: ReactNode
}

export interface ISubject {
  sub: string
}

export interface IUser extends ISubject {
  id: string
  nickname: string
  __typename?: string
  username?: string
}

export interface ITime {
  hour: number
  minute: number
}
export interface IEventState {
  date?: Date
  description?: string
  creatorJoining: boolean
  race?: boolean
  subtitle?: string
  time: ITime
  timeEnabled: boolean
  title?: string
  type?: EventType
  participants?: IUser[]
}

export interface IEventStep {
  toPrevStep: any
  toNextStep: any
}

export interface IEventBase {
  address?: string
  description?: string
  race: boolean
  subtitle?: string
  title: string
}

export interface IEventReq extends IEventBase {
  date: string
  type: string
  creatorJoining: boolean
  exactTime: boolean
}

export interface IEventResp extends IEventBase {
  id: ID
  date: string
  exactTime: boolean
  type: string
  participants: IUser[]
  creator: IUser
  updatedAt?: string
  createdAt?: string
  __typename?: string
}

export interface IEvent extends IEventBase {
  id: ID
  date: string
  time: string
  participants: IUser[]
  type: IEventTypeDescriptor
  creator: string
}

export interface IEventExtended extends IEvent {
  isoDate: string
}

interface IResponse {
  error?: {
    name: string
    message: string
  }
}

export interface ICreateEventResponse extends IResponse {
  event?: IEvent
}

export interface IPreferences {
  subscribeEventCreationEmail: boolean
  subscribeWeeklyEmail: boolean
}

export interface IYearMonth {
  year: number
  monthIndex: number
}

export interface ICalEvent {
  date: Date
  type: EventType
}

export interface IBaseUserInfo {
  id: ID
  nickname: string
  name: string
  avatar?: string
}

export interface ILocalUser extends ISubject {
  __typename?: string
  nickname: string
  picture: string
  name: string
}

export interface IUserInfo extends IBaseUserInfo {
  email: string
}

export interface IUpdateableUserInfo {
  nickname: string
  name: string
}
