import imgCycling from './images/events-cycling.jpg'
import imgKaronkka from './images/events-karonkka.jpg'
import imgMeeting from './images/events-meeting.jpg'
import imgOrienteering from './images/events-orienteering.jpg'
import imgOther from './images/events-other.jpg'
import imgRunning from './images/events-running.jpg'
import imgSkiing from './images/events-skiing.jpg'
import imgSpinning from './images/events-spinning.jpg'
import imgSwimming from './images/events-swimming.jpg'
import imgTrackRunning from './images/events-track-running.jpg'
import imgTriathlon from './images/events-triathlon.jpg'
import imgUltras from './images/events-ultras.jpg'
import imgTrailRunning from './images/events-trail-running.jpg'
import imgNordicWalking from './images/events-nordic-walking.jpg'
import { EventType, EventTypeDescriptor } from './types'

const FI_LOCAL = {
  months: [
    'Tammikuu',
    'Helmikuu',
    'Maaliskuu',
    'Huhtikuu',
    'Toukokuu',
    'Kesäkuu',
    'Heinäkuu',
    'Elokuu',
    'Syyskuu',
    'Lokakuu',
    'Marraskuu',
    'Joulukuu',
  ],
  weekdaysLong: [
    'Sunnuntai',
    'Maanantai',
    'Tiistai',
    'Keskiviikko',
    'Torstai',
    'Perjantai',
    'Lauantai',
  ],
  weekdaysShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
  firstDayOfWeek: 1,
  labels: {
    nextMonth: 'Seuraava kuu',
    previousMonth: 'Edellinen kuu',
  },
}

const EVENT_TYPES: EventTypeDescriptor[] = [
  {
    defaultImage: imgCycling,
    title: 'Pyöräily',
    id: EventType.Cycling,
    apiType: 'Cycling',
  },
  {
    defaultImage: imgRunning,
    title: 'Juoksu',
    id: EventType.Running,
    apiType: 'Running',
  },
  {
    defaultImage: imgOrienteering,
    title: 'Suunnistus',
    id: EventType.Orienteering,
    apiType: 'Orienteering',
  },
  {
    defaultImage: imgTrackRunning,
    title: 'Ratajuoksu',
    id: EventType.TrackRunning,
    apiType: 'TrackRunning',
  },
  {
    defaultImage: imgSpinning,
    title: 'Spinning',
    id: EventType.Spinning,
    apiType: 'Spinning',
  },
  {
    defaultImage: imgTriathlon,
    title: 'Triathlon',
    id: EventType.Triathlon,
    apiType: 'Triathlon',
  },
  {
    defaultImage: imgSwimming,
    title: 'Uinti',
    id: EventType.Swimming,
    apiType: 'Swimming',
  },
  {
    defaultImage: imgUltras,
    title: 'Ultras',
    id: EventType.Ultras,
    apiType: 'Ultras',
  },
  {
    defaultImage: imgOther,
    title: 'Muu',
    id: EventType.Other,
    apiType: 'Other',
  },
  {
    defaultImage: imgSkiing,
    title: 'Hiihto',
    id: EventType.Skiing,
    apiType: 'Skiing',
  },
  {
    defaultImage: imgKaronkka,
    title: 'Karonkka',
    id: EventType.Karonkka,
    apiType: 'Karonkka',
  },
  {
    defaultImage: imgMeeting,
    title: 'Kokous',
    id: EventType.Meeting,
    apiType: 'Meeting',
  },
  {
    defaultImage: imgNordicWalking,
    title: 'Sauvakävely',
    id: EventType.NordicWalking,
    apiType: 'NordicWalking',
  },
  {
    defaultImage: imgTrailRunning,
    title: 'Polkujuoksu',
    id: EventType.TrailRunning,
    apiType: 'TrailRunning',
  },
]

const WEEK_DAYS = ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su']

const EVENTS_PATH = '/events'
const PROFILE_PATH = '/profile'

const GRAPHQL_TYPES = {
  LOCAL_USER: 'LocalUser',
}

const QUERY_PARAMS = {
  KEYS: {
    FROM: 'from',
  },
  VALUES: {
    FROM: {
      HOME: 'home',
      VIEW: 'view',
    },
  },
}

const ROUTES = {
  createEvent: '/create-event',
  editEvent: `${EVENTS_PATH}/edit/:id`,
  viewEvent: `${EVENTS_PATH}/:id`,
  events: EVENTS_PATH,
  forgotPassword: '/forgot-password',
  calendar: '/calendar',
  home: '/',
  login: '/login',
  logout: '/logout',
  notFound: '/404',
  profile: PROFILE_PATH,
  profileSubscriptions: `${PROFILE_PATH}/subscriptions`,
  profileInfo: `${PROFILE_PATH}/info`,
  register: '/register',
  registerSuccess: '/registerSuccess',
  preferences: '/preferences',
  userList: '/user-list',
}

const MEASURES = {
  headerHeight: 50,
  footerHeight: 40,
}

export {
  FI_LOCAL,
  EVENT_TYPES,
  WEEK_DAYS,
  ROUTES,
  GRAPHQL_TYPES,
  QUERY_PARAMS,
  MEASURES,
  EVENTS_PATH,
}
