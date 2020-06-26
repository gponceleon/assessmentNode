const clientService = require('../services/clients.service');

class Clients {
  async clientById(req, res) {
    try {
      const response = await clientService.getClientById(req);

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

  async clientByName(req, res) {
    try {
      const response = await clientService.getClientByName(req);

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

module.exports = new Clients();
