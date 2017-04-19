// @flow
import type { Action, Location } from '../types';

export const sendCurrentLocation = (location: Location): Action => ({
  type: 'SEND_CURRENT_LOCATION',
  payload: { location },
});

export const sendCurrentLocationSuccess = (): Action => ({
  type: 'SEND_CURRENT_LOCATION_SUCCESS',
});

export const sendCurrentLocationFail = (error: Error): Action => ({
  type: 'SEND_CURRENT_LOCATION_FAIL',
  payload: { error },
});
