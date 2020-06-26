const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const serverHelper = require('../api/helpers/services.helper');
const clientsService = require('../api/services/clients.service');

const sandbox = sinon.createSandbox();

describe('Tests in clientsService', () => {
  describe('Tests in getClientById', () => {
    beforeAll(() => {
      this.servHelper = {
        getDatafromThirdAPI: sandbox.stub(serverHelper, 'getDatafromThirdAPI')
          .onCall(0).throws(new Error('Error'))
          .onCall(1)
          .returns({ clients: [] })
          .onCall(2)
          .returns({ clients: [{ id: 1 }] })
          .onCall(3)
          .returns({ clients: [{ id: 1 }] }),
        findData: sandbox.stub(serverHelper, 'findData')
          .onCall(0).returns(undefined)
          .onCall(1)
          .returns({ id: 1 }),
      };

      this.req = {
        user: {
          role: 'admin',
        },
        params: {
          userId: '1',
        },
      };

      this.service = proxyquire('../api/services/policies.service', { servHelper: this.servHelper });
    });
    test('Should catch general error', async () => {
      let existError = false;
      try {
        await clientsService.getClientById(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('Internal Server Error');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('Clients do no exist', async () => {
      let existError = false;
      try {
        await clientsService.getClientById(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('Resource not found');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('Client do no exist should return NO_CONTENT', async () => {
      const rs = await clientsService.getClientById(this.req);
      expect(rs.statusCode).toBe(204);
    });

    test('Client  exists should return OK', async () => {
      const rs = await clientsService.getClientById(this.req);
      expect(rs.statusCode).toBe(200);
    });

    afterAll(() => {
      sandbox.restore();
    });
  });

  describe('Tests in getClientByName', () => {
    beforeAll(() => {
      this.servHelper = {
        getDatafromThirdAPI: sandbox.stub(serverHelper, 'getDatafromThirdAPI')
          .onCall(0).throws(new Error('Error'))
          .onCall(1)
          .returns({ clients: [] })
          .onCall(2)
          .returns({ clients: [{ id: 1 }] })
          .onCall(3)
          .returns({ clients: [{ id: 1 }] }),
        findAllData: sandbox.stub(serverHelper, 'findAllData')
          .onCall(0).returns([])
          .onCall(1)
          .returns({ id: 1 })
          .onCall(2)
          .returns({ id: 1 }),
      };

      this.req = {
        user: {
          role: 'admin',
        },
        query: {
          username: '1',
        },
      };

      this.service = proxyquire('../api/services/policies.service', { servHelper: this.servHelper });
    });
    test('Should catch general error', async () => {
      let existError = false;
      try {
        await clientsService.getClientByName(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('Internal Server Error');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('The clients do not exist', async () => {
      let existError = false;
      try {
        await clientsService.getClientByName(this.req);
      } catch (error) {
        existError = true;
        expect(error.message).toBe('Resource not found');
      } finally {
        expect(existError).toBe(true);
      }
    });

    test('Should return NO_CONTENT', async () => {
      const rs = await clientsService.getClientByName(this.req);
      expect(rs.statusCode).toBe(204);
    });

    afterAll(() => {
      sandbox.restore();
    });
  });
});
