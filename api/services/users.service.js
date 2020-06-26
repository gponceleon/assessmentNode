
const jwt = require('jsonwebtoken');

const servHelper = require('../helpers/services.helper');
const logger = require('../common/logger');
const HttpError = require('../helpers/httpError');
const { USER_NOT_FOUND, INVALID_DATA, AUTHENTICATION_FAILURE, ERROR_AUTHENTICATING } = require('../helpers/errorCodes');
const { OK } = require('../helpers/httpResponses');

class UserService {
  /**
     * Get user by id
     * @param {ObjectId} id
     */
  getUserById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await servHelper.getDatafromThirdAPI(process.env.CLIENT_URL);
        const user = servHelper.findData(data.clients, 'id', id);
        resolve(user);
      } catch (error) {
        logger.error(`Error in getUserById for: ${error.message}`);
        reject(new HttpError(AUTHENTICATION_FAILURE));
      }
    });
  }

  /**
     * Get user by username
     * @param {String} username
     */
  getUserByUserName(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await servHelper.getDatafromThirdAPI(process.env.CLIENT_URL);
        const user = servHelper.findData(data.clients, 'email', username);
        resolve(user);
      } catch (error) {
        logger.error(`Error in getUserById for: ${error.message}`);
        reject(new HttpError(AUTHENTICATION_FAILURE));
      }
    });
  }

  /**
    * Login in API
    * @param {String} username Username
    * @param {String} password Password
    */
  login(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const { username, password } = req.body;

        if (!servHelper.isString(username) || !servHelper.isString(password)) throw new HttpError(INVALID_DATA);

        const user = await this.getUserByUserName(username);

        if (!user) throw new HttpError(USER_NOT_FOUND);

        const token = jwt.sign(
          { id: user.id },
          process.env.SECRET,
          { expiresIn: 100000 },
        );

        resolve({ ...OK, token });
      } catch (error) {
        logger.error(`Error in login for: ${error.message}`);
        if (error instanceof HttpError) {
          reject(servHelper.manageError(error));
        } else {
          reject(new HttpError(ERROR_AUTHENTICATING));
        }
      }
    });
  }
}

module.exports = new UserService();
