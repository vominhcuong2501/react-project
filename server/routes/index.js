
const cachePageRoute  = require('./cachePage.route.js')
module.exports.routes = function (app) {
  app.use('/api/cache', cachePageRoute);
};
