import Helper from '../helper/helper';
var superagent = require('superagent');
import RequestError from './request.error';
let assign = require('lodash.assign');
let merge = require('lodash.merge');

const ERROR_MESSAGE = 'You must provide a key and a path.';

export function baseRequest(options, callback) {

  options = options || {};

  if (!Helper.hasRequiredProperties('key', this.config) || !Helper.hasRequiredProperties('path', options)) {
    return this.handleError(ERROR_MESSAGE, callback);
  }

  return addGeolocation(options, (options) => {

    let method = options.method.toLowerCase();
    let url = formatUrl(assign({}, options, this.config));

    superagent[method](url)
      .set('X-Fidem-AccessApiKey', this.config.key || null)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .withCredentials()
      .send((options && options.body && JSON.stringify(options.body)) || null)
      .end((err, res) => {

        let requestError;
        if (res && res.statusCode >= 299) {
          requestError = new RequestError(res.body, res.statusCode);
        }

        if (callback && typeof callback === 'function') {

          let callbackError = err || requestError || null;
          let callbackBody = (res && res.body && JSON.parse(res.body)) || null;
          return callback(callbackError, callbackBody);

        } else {

          if (err || requestError) {
            return this.handleError(err || requestError, callback);
          }

        }

      });

  });

}

export function addGeolocation(options, callback) {

  function success(position) {
    let coordinates = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    callback(merge({}, options, { body: { coordinates: coordinates } }));
  }

  function error() {
    callback(merge({}, options, { body: { coordinates: null } }));
  }

  // don't change anything if request method is not POST or PUT
  if (!options.method || ['put', 'post'].indexOf(options.method.toLowerCase()) === -1) {
    return callback(options);
  }

  if (!window.navigator || !window.navigator.geolocation) {
    error();
  }  else {
    window.navigator.geolocation.getCurrentPosition(success, error);
  }

}

function formatUrl(url) {
  let path = url.path || '';
  return `${url.protocol}://${url.hostname}:${url.port}${path}`;
}
