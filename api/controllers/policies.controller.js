const policiesService = require('../services/policies.service');

class Policies {
  async policiesByUsername(req, res) {
    try {
      const response = await policiesService.getPoliciesByUsername(req);

      res.status(response.statusCode).send({
        status: response.statusCode,
        success: true,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      res.status(error.httpCode).send({
        success: false,
        message: error.message,
      });
    }
  }

  async policiesById(req, res) {
    try {
      const response = await policiesService.getPoliciesById(req);

      res.status(response.statusCode).send({
        status: response.statusCode,
        success: true,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      res.status(error.httpCode).send({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new Policies();
