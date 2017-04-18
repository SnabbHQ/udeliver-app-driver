// @flow
import type { Action, Location } from '../types';

export const setCurrentLocale = (location: Location): Action => ({
  type: 'SEND_CURRENT_LOCATION',
  payload: { location },
});
