// @flow
import type { Deps } from '../../types';
import { sendCurrentLocationSuccess, sendCurrentLocationFail } from '../actions';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Epic validating if a given address is valid or not in order to request either
 * a quote or perform a delivery.
 *
 * @return {Observable<R|I>}
 */
const sendCurrentLocation = (action$: any, { udeliverApi }: Deps) =>
  action$.ofType('SEND_CURRENT_LOCATION')
    .map(action => action.payload.location)
    .mergeMap((location) => Observable.fromPromise(udeliverApi.updateAgent('58f60e4c1940140004b1aa29',
      {
        email: 'postman@snabb.io',
        firstName: 'Post',
        lastName: 'Man',
        mobileNumber: '6615181329',
        transportType: 'car',
        transportDesc: 'Toyoto Corolla 2011',
        licensePlate: '1234',
        color: 'white',
        teamId: '123',
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
      },
})))
  .map(sendCurrentLocationSuccess)
  .catch(error => Observable.of(sendCurrentLocationFail(error)));

export default sendCurrentLocation;
