import { forEach, path } from 'ramda'
import { toast } from 'react-toastify'

type jsonFunc = (str: string) => number | undefined

const parseJson: jsonFunc = (value: string) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return undefined
  }
}

const getMessage = (maybeJsonMessage?: string): string => {
  if (!maybeJsonMessage) {
    return 'Joku virhe tuli nyt sitten'
  }
  const message = parseJson(maybeJsonMessage)

  if (message) {
    return path(['error_description'], message) || 'Virhe kirjautumisessa'
  } else {
    return maybeJsonMessage
  }
}

const setGraphQLErrors = (
  setFieldError: any,
  setGeneralError: any,
  errors: any
) => {
  forEach((error: any) => {
    const { name, data } = error
    if (name === 'UserInputError') {
      const { field, message } = data
      setFieldError(field, message)
    }
    if (name === 'Auth0Error') {
      const maybeJsonMessage: string | undefined = path(
        ['data', 'internalData', 'error', 'message'],
        error
      )

      const message = getMessage(maybeJsonMessage)

      setGeneralError(message)
    }
  }, errors)
}

const handleError = (error: any) => {
  const { graphQLErrors, networkError } = error
  if (graphQLErrors) {
    graphQLErrors.forEach((qlError: any) => {
      const { message, locations, path: errorPath, name } = qlError
      if (name === 'JWTError') {
        toast.warn('Kirjaudu uudelleen sisään')
      }
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${errorPath}`
      )
    })
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
    // toast.warn('Yhteys ongelmia');
  }
}

export { setGraphQLErrors, handleError }
