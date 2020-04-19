const useSentry: boolean = JSON.parse(
  process.env.REACT_APP_SENTRY_LOGS || 'true'
)

const appSentryRelease: string =
  process.env.REACT_APP_SENTRY_RELEASE || 'unspecified'

const sentryEnvironment: string =
  process.env.REACT_APP_SENTRY_ENVIRONMENT || 'local'

export { useSentry, appSentryRelease, sentryEnvironment }
