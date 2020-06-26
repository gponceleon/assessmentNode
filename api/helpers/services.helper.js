const HttpError = require('../helpers/httpError');
const needle = require('needle');
const { INTERNAL_SERVER_ERROR } = require('../helpers/errorCodes');
const logger = require('../common/logger');

class ServiceHelper {
  isString(param) {
    return typeof param === 'string';
  }

  isNumber(param) {
    return typeof param === 'number';
  }

  /**
     * Manage the error for the correct response
     * @param {*} error
     */
  manageError(error) {
    return error instanceof HttpError ? error : INTERNAL_SERVER_ERROR;
  }

  /**
     * Get the data from the Third API
     * @param {String} url URL
     */
  async getDatafromThirdAPI(url) {
    try {
      const response = await needle('get', url);
      return response.body;
    } catch (error) {
      logger.error(`Error in getDatafromThirdAPI for: ${error.message}`);
      this.manageError(error);
    }
  }

  /**
     * Find Data given a label
     * @param {Array} array Array to search
     * @param {String} label Label to search inside the array
     * @param {String} key Value to search
     */
  findData(array, label, key) {
    try {
      const element = array.find(value => value[label] === key);
      return element;
    } catch (error) {
      logger.error(`Error in findData for: ${error.message}`);
      this.manageError(error);
    }
  }

  /**
    * Find all data that contains the key
    * @param {Array} array Array to search
    * @param {String} label Label to search inside the array
    * @param {String} key Value to search
    */
  findAllData(array, label, key) {
    try {
      const element = array.filter(value => value[label].includes(key));
      return element;
    } catch (error) {
      logger.error(`Error in findAllData for: ${error.message}`);
      this.manageError(error);
    }
  }
}

module.exports = new ServiceHelper();

