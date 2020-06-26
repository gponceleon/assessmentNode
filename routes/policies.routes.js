const policiesCtrl = require('../api/controllers/policies.controller');
const passport = require('passport');

const authorization = require('../api/middlewares/authorization.middleware');

module.exports = function (app, express) {
  const rPolicies = express.Router();
  rPolicies
    .get(
      '/',
      passport.authenticate('jwt', { session: false }),
      authorization(['admin']),
      policiesCtrl.policiesByUsername,
    )
    .get(
      '/:policyId',
      passport.authenticate('jwt', { session: false }),
      authorization(['admin']),
      policiesCtrl.policiesById,
    );
  app.use(`${process.env.ROUTE}/policies`, rPolicies);
};
