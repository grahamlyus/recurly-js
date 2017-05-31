import Promise from 'promise';
import {AdyenStrategy} from './index';

const debug = require('debug')('recurly:paypal:strategy:direct');

/**
 * Direct Adyen Checkout strategy
 */
export class DirectStrategy extends AdyenStrategy {
  constructor (...args) {
    super(...args);
    this.emit('ready');
  }

  start (opts) {
    const payload = {
      subscriptionUuid: opts.subscriptionUuid,
      countryCode: opts.countryCode,
      shopperLocale: opts.shopperLocale,
      currencyCode: opts.currencyCode,
      skinCode: opts.skinCode
    };

    const frame = this.recurly.Frame({ height: 600, path: '/adyen/start', payload });
    frame.once('error', cause => this.error('paypal-tokenize-error', { cause }));

    frame.once('done', function(token) {
      this.emit('token', token)
    })
  }
}
