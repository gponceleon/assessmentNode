const logger = require('../common/logger');
const servHelper = require('../helpers/services.helper');
const HttpError = require('../helpers/httpError');
const { NO_CONTENT, OK } = require('../helpers/httpResponses');
const { NOT_FOUND, USER_NOT_FOUND } = require('../helpers/errorCodes');

class Policies {
  async getPoliciesByUsername(req) {
    try {
      const { query: { username } } = req;

      const clientData = await servHelper.getDatafromThirdAPI(process.env.CLIENT_URL);
      const client = servHelper.findData(clientData.clients, 'email', username);

      if (!client) throw new HttpError(USER_NOT_FOUND);

      const data = await servHelper.getDatafromThirdAPI(process.env.POLICIES_URL);

      if (!data.policies.length) throw new HttpError(NOT_FOUND);

      const policies = servHelper.findAllData(data.policies, 'email', username);
      const label = !policies.length ? NO_CONTENT : OK;

      return {
        statusCode: label.statusCode,
        message: label.message,
        data: policies,
      };
    } catch (error) {
      logger.error(`Error in getPoliciesByUsername for: ${error.message}`);
      throw servHelper.manageError(error);
    }
  }

  async getPoliciesById(req) {
    try {
      const { params: { policyId } } = req;

      const data = await servHelper.getDatafromThirdAPI(process.env.POLICIES_URL);

      if (!data.policies.length) throw new HttpError(NOT_FOUND);

      const policy = servHelper.findData(data.policies, 'id', policyId);

      if (!policy) throw new HttpError(NOT_FOUND);

      const clientData = await servHelper.getDatafromThirdAPI(process.env.CLIENT_URL);
      const clients = servHelper.findAllData(clientData.clients, 'email', policy.email);

      const label = !clients.length ? NO_CONTENT : OK;

      return {
        statusCode: label.statusCode,
        message: label.message,
        data: clients,
      }
      ;
    } catch (error) {
      logger.error(`Error in getPoliciesByUsername for: ${error.message}`);
      throw servHelper.manageError(error);
    }
  }
}

module.exports = new Policies();
