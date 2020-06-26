const userCntrl = require('../api/controllers/users.controller');


module.exports = function (app, express) {
  const rUser = express.Router();
  rUser
    .post('/login', userCntrl.login);
  app.use(`${process.env.ROUTE}`, rUser);
};
