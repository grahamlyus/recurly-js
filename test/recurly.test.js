import assert from 'assert';
import {Recurly} from '../lib/recurly';

describe('Recurly', () => {
  let recurly;

  beforeEach(() => recurly = new Recurly);

  it('should have a version', () => assert(typeof recurly.version === 'string'));
  it('should be an event emitter', () => assert(recurly.on && recurly.emit));
  it('should be exposed as a global singleton', () => {
    assert(window.recurly instanceof window.recurly.Recurly)
  });

  describe('Recurly.request', () => {
    let cors = false;

    beforeEach(() => {
      recurly.configure({
        publicKey: 'test',
        api: `//${global.location.host}/api`,
        cors: cors
      });
    });

    describe('when configured for jsonp requests', () => {
      it('invokes recurly.jsonp', () => {
        sinon.stub(recurly, 'jsonp');
        recurly.request('get', 'test', () => {});
        assert(recurly.jsonp.calledOnce);
      });
    });

    describe('when configured for cors requests', () => {
      before(() => cors = true);

      it('invokes recurly.xhr', () => {
        sinon.stub(recurly, 'xhr');
        recurly.request('get', 'test', () => {});
        assert(recurly.xhr.calledOnce);
      });
    });
  });
});
