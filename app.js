const express = require('express');

const app = express();
const passport = require('passport');
const logger = require('./api/common/logger');

const fs = require('fs');

require('./config/express')(app);

if (fs.existsSync('./.env')) {
  require('dotenv').config();
}

/* Import middlewares */
const authentication = require('./api/middlewares/authentication.middleware.js');

/* Set authentication */
passport.use(authentication);

require('./routes/clients.routes')(app, express);
require('./routes/policies.routes')(app, express);
require('./routes/user.routes')(app, express);

module.exports = app; // for testing

const port = process.env.PORT || 80;
const host = process.env.HOST || 'localhost';

app.listen(port, () => {
  logger.info(`Api is running on http://${host}:${port}`);
});

