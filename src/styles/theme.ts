import Color from 'color'

const redColor = Color('#FF5471')
const pinkColor = Color('#FF80EA')
const blueColor = Color('#07c')

// TODO: fix colors
const blue = blueColor.hex()
const lightBlue = blueColor.lighten(0.4).hex()
const red = redColor.hex()
const lightRed = redColor.lighten(0.4).hex()
const lightgray = '#9a9a9a'
const lightergray = '#E6E6E6'
const lightestgray = '#e9e9e9'
const darkGray = '#1f1f1f'
const darkWhite = '#f4f4f5'
const black = '#140D33'
const standardBlack = '#000'
const lightBlack = '#404035'
const pink = pinkColor.hex()
const lightPink = pinkColor.lighten(0.2).hex()
const darkPink = pinkColor.darken(0.1).hex()
const white = '#fff'
const transparentBlack = 'rgba(0,0,0,0.6)'
const moreTransparentBlack = 'rgba(0,0,0,0.7)'
const faintBg = 'rgba(0,0,0,0.2)'

const primaryForm = {
  bg: 'white',
  border: '1px solid lightgray',
  borderRadius: '4px',
  boxSizing: 'border-box',
  caretColor: 'lightgray',
  fontSize: '16px',
  outline: 'none',
  padding: '18px 8px',
  width: '100%',

  '&::placeholder': {
    color: 'lightgray',
    fontWeight: 600,
  },
}
const primaryFormError = {
  ...primaryForm,
  border: '1px solid red',
}

const eventForm = {
  bg: 'transparent',
  border: 0,
  borderBottom: '1px solid gray',
  boxSizing: 'border-box',
  caretColor: 'pink',
  fontSize: '24px',
  outline: 'none',
  padding: '2px 2px',
  width: '100%',

  '&::placeholder': {
    color: 'lightgray',
    fontWeight: 600,
  },
}

const eventFormError = {
  ...eventForm,
  borderBottom: '1px solid red',
}

const primaryButton = {
  py: 3,
  backgroundColor: pink,
  color: white,
  textTransform: 'uppercase',
  fontWeight: 600,
  '&[disabled]': {
    backgroundColor: lightPink,
    cursor: 'not-allowed',
  },
  '&[disabled]:hover': {
    backgroundColor: lightPink,
    cursor: 'not-allowed',
  },
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: darkPink,
  },
}

const theme: any = {
  breakpoints: ['40em', '52em', '64em'],

  buttons: {
    empty: {
      color: pink,
      backgroundColor: 'transparent',
      p: 1,
    },
    outline: {
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
      color: blue,

      '&:hover': {
        color: Color(blue).lighten(0.5).string(),
      },
    },
    outlinePrimary: {
      ...primaryButton,
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
      color: pink,
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: Color(pink).lighten(0.8).string(),
      },
    },
    primary: primaryButton,
    greyed: {
      backgroundColor: 'lightergray',
    },
    mini: {
      ...primaryButton,
      backgroundColor: 'transparent',

      color: pink,
      py: 1,
      fontSize: '12px',
    },
    secondary: {
      ...primaryButton,
      backgroundColor: blue,
      width: 'auto',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: Color(blue).darken(0.1).string(),
      },
      '&[disabled]': {
        cursor: 'not-allowed',
        backgroundColor: lightergray,
      },
      '&[disabled]:hover': {
        cursor: 'not-allowed',
        backgroundColor: lightergray,
      },
    },
    warn: {
      ...primaryButton,
      backgroundColor: 'red',
      boxShadow: 'inset 0 0 0 2px',
      color: white,

      '&:hover': {
        backgroundColor: lightRed,
        cursor: 'not-allowed',
      },
      '&[disabled]': {
        backgroundColor: lightRed,
        cursor: 'not-allowed',
      },
      '&[disabled]:hover': {
        backgroundColor: lightRed,
        cursor: 'not-allowed',
      },
    },
  },
  cards: {
    shadow: {
      backgroundColor: 'transparent',
      borderRadius: '15px 15px 15px 15px',
      boxShadow: '0 2px 16px rgba(0, 0, 0, 0.25)',
    },
  },
  colors: {
    black,
    blue,
    darkGray,
    darkPink,
    darkWhite,
    faintBg,
    lightBlack,
    lightBlue,
    lightergray,
    lightestgray,
    lightgray,
    lightPink,
    lightRed,
    moreTransparentBlack,
    pink,
    red,
    standardBlack,
    transparentBlack,
    white,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Titillium Web',
    monospace: `'Ubuntu Mono', monospace`,
  },
  forms: {
    primary: primaryForm,
    'primary-error': primaryFormError,
    event: eventForm,
    'event-error': eventFormError,
  },

  shadows: {
    large: '0 0 24px rgba(0, 0, 0, .125)',
    small: '0 0 4px rgba(0, 0, 0, .125)',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
}

const colors = theme.colors

export { theme, colors }
