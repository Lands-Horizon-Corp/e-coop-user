import { APP_ENV } from '@/constants';
import log from 'loglevel';

const isDev = APP_ENV === 'development'

log.setLevel(isDev ? 'debug' : 'warn')

export const logger = log;