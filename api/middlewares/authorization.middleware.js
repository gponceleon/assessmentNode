module.exports = function authorityGenerator(roles = []) {
  return function (req, res, next) {
    const { role } = req.user;

    if (roles.length && roles.includes(role)) {
      next();
    } else {
      res.status(403).send();
    }
  };
};
