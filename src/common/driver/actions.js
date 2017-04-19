// @flow
import type { Action, Location } from '../types';

export const sendCurrentLocation = (location: Location): Action => ({
  type: 'SEND_CURRENT_LOCATION',
  payload: { location },
});
