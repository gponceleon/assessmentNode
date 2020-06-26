const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const serverHelper = require('../api/helpers/services.helper');
const policiesService = require('../api/services/policies.service');

const sandbox = sinon.createSandbox();

describe('Tests in PoliciesService', () => {
  describe('Tests in getPoliciesById', () => {
    beforeAll(() => {
      this.servHelper = {
        getDatafromThirdAPI: sandbox.stub(serverHelper, 'getDatafromThirdAPI')
          .onCall(0).throws(new Error('Error'))
          .onCall(1)
          .returns({ policies: [] })
          .onCall(2)
          .returns({
            policies: [{
              id: '56b415d6-53ee-4481-994f-4bffa47b5239',
              amountInsured: 2301.98,
              email: 'inesblankenship@quotezart.com',
              inceptionDate: '2014-12-01T05:53:13Z',
              installmentPayment: false,
              clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
            }],
          })
          .onCall(3)
          .returns({
            policies: [{
              id: '56b415d6-53ee-4481-994f-4bffa47b5239',
              amountInsured: 2301.98,
              email: 'inesblankenship@quotezart.com',
              inceptionDate: '2014-12-01T05:53:13Z',
              installmentPayment: false,
              clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
            }],
          })
          .onCall(4)
          .returns({
            clients: [],
          })
          .onCall(5)
          .returns({
            policies: [{
              id: '56b415d6-53ee-4481-994f-4bffa47b5239',
              amountInsured: 2301.98,
              email: 'inesblankenship@quotezart.com',
              inceptionDate: '2014-12-01T05:53:13Z',
              installmentPayment: false,
              clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
            }],
          })
          .onCall(6)
          .returns({
            clients: [{ email: 'inesblankenship@quotezart.com' }],
          }),
        findData: sandbox.stub(serverHelper, 'findData')
          .onCall(0).returns(undefined)
          .onCall(1)
          .returns({
            id: '56b415d6-53ee-4481-994f-4bffa47b5239',
            amountInsured: 2301.98,
            email: 'inesblankenship@quotezart.com',
            inceptionDate: '2014-12-01T05:53:13Z',
            installmentPayment: false,
            clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
          })
          .onCall(2)
          .returns(undefined)
          .onCall(2)
          .returns({ email: 'inesblankenship@quotezart.com' }),
      };

      this.req = {
        user: {
          role: 'admin',
        },
        params: {
          policyId: '1',
        },
      };

      this.service = proxyquire('../api/services/policies.service', { servHelper: this.servHelper });
    });

    test('Should cath a general error', async () => {
      let existError = false;
      try {
        await policiesService.getPoliciesById(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('Internal Server Error');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('The policies do not exists', async () => {
      let existError = false;
      try {
        await policiesService.getPoliciesById(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('Resource not found');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('The policy does not exists', async () => {
      let existError = false;
      try {
        await policiesService.getPoliciesById(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('Resource not found');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('Given user does not link to a policy should return NOT_CONTENT', async () => {
      const rs = await policiesService.getPoliciesById(this.req);
      expect(rs.statusCode).toBe(204);
    });

    test('Given user links to a policy should return NOT_CONTENT', async () => {
      const rs = await policiesService.getPoliciesById(this.req);
      expect(rs.statusCode).toBe(200);
    });

    afterAll(() => {
      sandbox.restore();
    });
  });

  describe('Test in getPoliciesByUsername', () => {
    beforeAll(() => {
      this.servHelper = {
        getDatafromThirdAPI: sandbox.stub(serverHelper, 'getDatafromThirdAPI')
          .onCall(0).throws(new Error('Error'))
          .onCall(1)
          .returns({ clients: [] })
          .onCall(2)
          .returns({
            clients: [{
              id: '40dbdf5d-67e7-41aa-ab4a-20908fe6f02f',
              name: 'Vang',
              email: 'vangblankenship@quotezart.com',
              role: 'admin',
            }],
          })
          .onCall(3)
          .returns({ policies: [] })
          .onCall(4)
          .returns({
            clients: [{
              id: '40dbdf5d-67e7-41aa-ab4a-20908fe6f02f',
              name: 'Vang',
              email: 'vangblankenship@quotezart.com',
              role: 'admin',
            }],
          })
          .onCall(5)
          .returns({
            policies: [{
              id: '56b415d6-53ee-4481-994f-4bffa47b5239',
              amountInsured: 2301.98,
              email: 'inesblankenship@quotezart.com',
              inceptionDate: '2014-12-01T05:53:13Z',
              installmentPayment: false,
              clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
            }],
          })
          .onCall(6)
          .returns({
            clients: [{
              id: '40dbdf5d-67e7-41aa-ab4a-20908fe6f02f',
              name: 'Vang',
              email: 'vangblankenship@quotezart.com',
              role: 'admin',
            }],
          })
          .onCall(7)
          .returns({
            policies: [{
              id: '56b415d6-53ee-4481-994f-4bffa47b5239',
              amountInsured: 2301.98,
              email: 'inesblankenship@quotezart.com',
              inceptionDate: '2014-12-01T05:53:13Z',
              installmentPayment: false,
              clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
            }],
          }),
        findData: sandbox.stub(serverHelper, 'findData')
          .onCall(0).returns(undefined)
          .onCall(1)
          .returns({
            id: '40dbdf5d-67e7-41aa-ab4a-20908fe6f02f',
            name: 'Vang',
            email: 'vangblankenship@quotezart.com',
            role: 'admin',
          })
          .onCall(2)
          .returns({
            id: '40dbdf5d-67e7-41aa-ab4a-20908fe6f02f',
            name: 'Vang',
            email: 'vangblankenship@quotezart.com',
            role: 'admin',
          })
          .onCall(3)
          .returns({
            id: '40dbdf5d-67e7-41aa-ab4a-20908fe6f02f',
            name: 'Vang',
            email: 'vangblankenship@quotezart.com',
            role: 'admin',
          }),
        findAllData: sandbox.stub(serverHelper, 'findAllData')
          .onCall(0).returns([])
          .onCall(1)
          .returns([{}]),
      };
      this.req = {
        user: {
          role: 'admin',
        },
        query: {
          username: 'pperez',
        },
      };

      this.service = proxyquire('../api/services/policies.service', { servHelper: this.servHelper });
    });


    test('Should cath a general error', async () => {
      let existError = false;
      try {
        await policiesService.getPoliciesByUsername(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('Internal Server Error');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('The client does not exists', async () => {
      let existError = false;
      try {
        await policiesService.getPoliciesByUsername(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('User is not signed up');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('The policies do not exists', async () => {
      let existError = false;
      try {
        await policiesService.getPoliciesByUsername(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('Resource not found');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('Should return NO_CONTENT', async () => {
      const rs = await policiesService.getPoliciesByUsername(this.req);
      expect(rs.statusCode).toBe(204);
    });

    test('Should return OK', async () => {
      const rs = await policiesService.getPoliciesByUsername(this.req);
      expect(rs.statusCode).toBe(200);
    });

    afterAll(() => {
      sandbox.restore();
    });
  });
});

