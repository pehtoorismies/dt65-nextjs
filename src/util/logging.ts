import { getIdToken, getLocalUser } from './auth';
import { appSentryRelease, sentryEnvironment } from '../config';
import * as Sentry from '@sentry/browser';
import { ILocalUser } from '../types';

const logUser = (senrtyEnabled: boolean, lUser: ILocalUser): void => {
  if (!senrtyEnabled) {
    return;
  }
  const { nickname, sub, name } = lUser;
  Sentry.configureScope(scope => {
    scope.setUser({
      nickname,
      sub,
      name,
    });
  });
};

const sentryErrorHandler = (error: Error, componentStack: string) => {
  Sentry.captureException(error);
};

const printHandler = (error: Error, componentStack: string) => {
  console.error(error);
};

const logInitUser = () => {
  const idToken = getIdToken();
  if (!idToken) {
    return;
  }

  const iUser = getLocalUser(idToken);
  if (!iUser) {
    return;
  }
  logUser(true, iUser);
};

const initLogging = (
  enabled: boolean
): ((error: Error, componentStack: string) => void) => {
  if (!enabled) {
    return printHandler;
  }

  Sentry.init({
    release: appSentryRelease,
    dsn: 'https://091d008900c64d4bb7640ab2a4fe5bff@sentry.io/1805673',
    environment: sentryEnvironment,
  });
  logInitUser();

  return sentryErrorHandler;
};

export { initLogging, logUser };
