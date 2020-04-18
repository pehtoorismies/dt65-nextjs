import forEach from 'ramda/es/forEach';
import path from 'ramda/es/path';
import { toast } from 'react-toastify';

type jsonFunc = (str: string) => number | undefined;

const parseJson: jsonFunc = (str: string) => {
  
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
};

const getMessage = (maybeJsonMsg?: string) : string => {
  if (!maybeJsonMsg) {
    return 'Joku virhe tuli nyt sitten';
  }
  const msg = parseJson(maybeJsonMsg);

  if (msg) {
    return path(['error_description'], msg) || 'Virhe kirjautumisessa';
  } else {
    return maybeJsonMsg;
  }
};

const setGraphQLErrors = (
  setFieldError: any,
  setGeneralError: any,
  errors: any
) => {
  forEach((err: any) => {
    const { name, data } = err;
    if (name === 'UserInputError') {
      const { field, message } = data;
      setFieldError(field, message);
    }
    if (name === 'Auth0Error') {
      const maybeJsonMsg : string | undefined = path(
        ['data', 'internalData', 'error', 'message'],
        err
      );
      
      const msg = getMessage(maybeJsonMsg);

      setGeneralError(msg);
    }
  }, errors);
};

const handleError = (error: any) => {
  const { graphQLErrors, networkError } = error;
  if (graphQLErrors) {
    graphQLErrors.forEach((err: any) => {
      const { message, locations, path: errPath, name } = err;
      if (name === 'JWTError') {
        toast.warn('Kirjaudu uudelleen sisään');
      }
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${errPath}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // toast.warn('Yhteys ongelmia');
  }
};

export { setGraphQLErrors, handleError };
