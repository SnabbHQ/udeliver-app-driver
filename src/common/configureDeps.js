// @flow

import type { Deps, State } from './types';
// By feature import doesn't work in Node.js. Tested with 3.6.10.
// firebase.google.com/docs/web/setup
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
import firebase from 'firebase';
import UdeliverApi from './lib/UdeliverApi';
import validate from './validate';

// Ensure only one Firebase instance. I don't know how costly new instance is
// and how to dispose of it. Yes, firebase.initializeApp is weird API.
let firebaseDeps = null;

const createFirebaseDeps = firebaseConfig => {
  if (!firebaseDeps) {
    firebase.initializeApp(firebaseConfig);
    firebaseDeps = {
      firebase: firebase.database().ref(),
      firebaseAuth: firebase.auth,
      firebaseDatabase: firebase.database,
    };
  }
  // // Check whether Firebase works.
  // firebaseDeps.firebase.child('hello-world').set({
  //   createdAt: firebaseDeps.firebaseDatabase.ServerValue.TIMESTAMP,
  //   text: 'Yes!'
  // });
  return firebaseDeps;
};

// Ensure only one Data Instance instance.
let dataDeps = null;

const createDataDeps = (apiConfig) => {
  if (!dataDeps) {
    const udeliverApi = new UdeliverApi(apiConfig);

    dataDeps = {
      udeliverApi,
    };
  }

  return dataDeps;
};

const configureDeps = (initialState: State, platformDeps: Deps) => ({
  ...platformDeps,
  ...createDataDeps(initialState.config.apiConfig),
  ...createFirebaseDeps(initialState.config.firebase),
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
});

export default configureDeps;
