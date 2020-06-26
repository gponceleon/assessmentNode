const clientCtrl = require('../api/controllers/client.controller');
const passport = require('passport');

const authorization = require('../api/middlewares/authorization.middleware');

module.exports = function (app, express) {
  const rClients = express.Router();
  rClients
    .get(
      '/:userId',
      passport.authenticate('jwt', { session: false }),
      authorization(['admin', 'users']),
      clientCtrl.clientById,
    )
    .get(
      '/',
      passport.authenticate('jwt', { session: false }),
      authorization(['admin', 'users']),
      clientCtrl.clientByName,
    )
  ;
  app.use(`${process.env.ROUTE}/clients`, rClients);
};
