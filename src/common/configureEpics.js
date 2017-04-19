// @flow
import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { epics as authEpics } from './auth/actions';
import { epics as driverEpics } from './driver/epics';
import { epics as usersEpics } from './users/actions';

const epics = [...appEpics, ...authEpics, ...driverEpics, ...usersEpics];

const configureEpics = (deps: Object) =>
  (action$: any, { getState }: any) =>
    combineEpics(...epics)(action$, { ...deps, getState });

export default configureEpics;
