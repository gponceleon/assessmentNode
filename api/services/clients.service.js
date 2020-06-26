const logger = require('../common/logger');
const servHelper = require('../helpers/services.helper');
const HttpError = require('../helpers/httpError');
const { NO_CONTENT, OK } = require('../helpers/httpResponses');
const { NOT_FOUND } = require('../helpers/errorCodes');

class Clients {
  async getClientById(req) {
    try {
      const { params: { userId } } = req;

      const data = await servHelper.getDatafromThirdAPI(process.env.CLIENT_URL);

      if (!data.clients.length) throw new HttpError(NOT_FOUND);

      const client = servHelper.findData(data.clients, 'id', userId);

      const label = !client ? NO_CONTENT : OK;

      return {
        statusCode: label.statusCode,
        message: label.message,
        data: client,
      };
    } catch (error) {
      logger.error(`Error in getClientById for: ${error.message}`);
      throw servHelper.manageError(error);
    }
  }

  async getClientByName(req) {
    try {
      const { query: { username } } = req;

      const data = await servHelper.getDatafromThirdAPI(process.env.CLIENT_URL);

      if (!data.clients.length) throw new HttpError(NOT_FOUND);

      const client = servHelper.findAllData(data.clients, 'email', username);

      const label = !client.length ? NO_CONTENT : OK;

      return {
        statusCode: label.statusCode,
        message: label.message,
        data: client,
      };
    } catch (error) {
      logger.error(`Error in getClientById for: ${error.message}`);
      throw servHelper.manageError(error);
    }
  }
}

module.exports = new Clients();
