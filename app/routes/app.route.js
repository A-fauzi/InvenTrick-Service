const { routeProduct } = require("./route.product");
const { routeUser } = require("./route.user");

exports.routes = (app) => {
  routeProduct(app)

  // User route
  // routes
  require('../routes/auth.routes')(app);
  require('../routes/route.user')(app);

};
