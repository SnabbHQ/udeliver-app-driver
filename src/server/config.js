// @flow
// www.andrewsouthpaw.com/2015/02/08/environment-variables/
import nconf from 'nconf';

// Use less-terrible separator character, stackoverflow.com/questions/25017495
nconf.env('__');

// For local development, we can override defaults easily. Rename
// src/common/_config.json to src/common/config.json and uncomment next line.
// nconf.file('src/common/config.json');

// Remember, never put secrets in the source code. Use environment variables for
// production or src/common/config.json for development instead.
nconf.defaults({
  appName: require('../../package.json').name,
  // Use appVersion defined in gulp env task or Heroku dyno metadata.
  appVersion: process.env.appVersion || process.env.HEROKU_SLUG_COMMIT,
  defaultLocale: 'en',
  firebase: {
    // To get the config, just click Add web app from the overview page.
    apiKey: 'AIzaSyDZRAOrDErAaC-TCKbr4cMzaohsPR4sWgU',
    authDomain: 'este.firebaseapp.com',
    databaseURL: 'https://este.firebaseio.com',
    storageBucket: 'project-808488257248094054.appspot.com',
  },
  googleAnalyticsId: 'UA-XXXXXXX-X',
  isProduction: process.env.NODE_ENV === 'production',
  locales: ['cs', 'de', 'en', 'es', 'fr', 'pt', 'ro'],
  port: process.env.PORT || 3000,
  // Enable hot reload on remote device. Note it prevents offline testing,
  // because it depends on ip.address(), which doesn't work with disabled wifi.
  // How do we access a website running on localhost from mobile browser?
  // stackoverflow.com/questions/3132105
  remoteHotReload: true,
  sentryUrl: 'https://f297cec9c9654088b8ccf1ea9136c458@app.getsentry.com/77415',
  apiConfig: {
    // Mock Env
    // baseUrl: 'http://snabb-api-mock.herokuapp.com/api/v1',
    // clientId: '123456'

    // Local Dev - TODO - This should go with env variables
    // baseUrl: 'http://localhost:8000/api/v1',
    // clientId: 'cRRvcMMUoFtUc0SqUUulKeBF7yxbrdNgwc8x3XzH'

    // Develop
    baseUrl: 'http://udeliver-api-backend.herokuapp.com/api',
    clientId: 'wGbZg2PTuoZnmk6V2kNs45xC0zo3HHS08FJ4c8Tr',
  },
});

export default nconf.get();
