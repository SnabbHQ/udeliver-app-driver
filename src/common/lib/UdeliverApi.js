// @flow
/* global fetch */
// https://github.com/github/fetch/issues/275#issuecomment-181784694
import ApiError from './ApiError';
import fetchIntercept from 'fetch-intercept';

import 'whatwg-fetch';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

/**
 * # UdeliverApi.js
 *
 * This class interfaces with Udeliver's API using the rest api.
 *
 */
class UdeliverApi {
  API_BASE_URL: string;
  cliendId: string;
  sessionToken: Object;
  response: Object;

  constructor(apiConfig: Object) {
    this.API_BASE_URL = apiConfig.baseUrl;
    this.cliendId = apiConfig.clientId;

    fetchIntercept.register({

      request: (url, config) => {
        if (this.sessionToken) {
          // Not really pretty but works
          if (config.headers) {
            config.headers.Authorization = this.getSessionToken();
          } else {
            config.headers = {
              Authorization: this.getSessionToken(),
            };
          }
        }

        return [url, config];
      },
    });
  }

  static encodeBody(data: Object) {
    const formBody = [];

    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }

    return formBody.join('&');
  }

  static handleErrors(response: Object) {
    if (!response.ok) {
      return response.json().then(json => {
        throw new ApiError(json.key, {
          code: json.code,
          error: json.message,
        });
      });
    }

    return response;
  }

  static handleUnExpectedError() {
    throw new ApiError('UNEXPECTED', {
      code: 500,
      error: 'Un-expected error message',
    });
  }

  setSessionToken(sessionToken: Object) {
    this.sessionToken = sessionToken;
  }

  getSessionToken() {
    return this.sessionToken && this.sessionToken.access_token
      ? `Bearer ${this.sessionToken.access_token}`
      : undefined;
  }

  async getAgent(agentId: string) {
    return fetch(`${this.API_BASE_URL}/agents/${agentId}`, ({ method: 'GET' }))
    .then(this.constructor.handleErrors)
    .then((res) => res.json().then(json => {
      if (res.status === 200 || res.status === 201) {
        return json;
      }

      return this.constructor.handleUnExpectedError();
    }));
  }

  async updateAgent(agentId: string, data: Object) {
    return fetch(`${this.API_BASE_URL}/agents/${agentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(this.constructor.handleErrors).then((res) => res.json().then(json => {
      if (res.status === 200 || res.status === 201) {
        return json;
      }

      return this.constructor.handleUnExpectedError();
    }));
  }
}

export default UdeliverApi;
