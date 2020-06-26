const { ExtractJwt, Strategy } = require('passport-jwt');
const logger = require('../common/logger');

const userService = require('../services/users.service');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};


module.exports = new Strategy(options, (({ id }, done) => {
    userService.getUserById(id)
        .then(user => {
            user && done(null, { ...user, id });
            !user && done(null, null);
        })
        .catch(error => {
            logger.error(error.message);
            done(null, null);
        })
        ;
}));
