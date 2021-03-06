import { expect } from 'chai';
import sinon from 'sinon';
import getRequest from '../../src/http.methods/get';

describe('get.js', () => {
  const ERROR_MESSAGE_ENDPOINT = 'You must provide a endpoint.';
  const ERROR_MESSAGE_CALLBACK = 'You must provide a callback.';

  let handleErrorStub;
  let baseRequestStub;

  beforeEach(done => {
    handleErrorStub = sinon.stub(lr360.client, 'handleError', () => {});
    baseRequestStub = sinon.stub(lr360.client, 'baseRequest', () => {});
    done();
  });

  afterEach(done => {
    handleErrorStub.restore();
    baseRequestStub.restore();
    done();
  });

  it('should throw error when called without an endpoint', done => {

    let endpoint = null;
    let callback = () => {};

    getRequest(endpoint, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_ENDPOINT, callback)).to.be.true;
    done();

  });

  it('should throw error when called without an callback', done => {

    let endpoint = '/test/route';
    let callback = null;

    getRequest(endpoint, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK, callback)).to.be.true;
    done();

  });

  it('should throw error when called with wrong parameter type (for endpoint)', done => {

    let endpoint = () => {}; // jscs:disable
    let callback = () => {};

    getRequest(endpoint, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_ENDPOINT, callback)).to.be.true;
    done();

  });

  it('should throw error when called with wrong parameter type (for callback)', done => {

    let endpoint = '/test/route';
    let callback = {};

    getRequest(endpoint, callback);

    expect(handleErrorStub.calledWith(ERROR_MESSAGE_CALLBACK, callback)).to.be.true;
    done();

  });

  it('should call baserequest with correct parameters', done => {

    let endpoint = '/test/route';
    let callback = () => {};

    getRequest(endpoint, callback);

    expect(baseRequestStub.calledWith({
      method: 'GET',
      path: endpoint,
    }, callback)).to.be.true;
    done();

  });

});