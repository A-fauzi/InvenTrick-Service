const { routeProduct } = require("./route.product");
const { routeUser } = require("./route.user");

exports.routes = (app) => {
  routeProduct(app)
  routeUser(app)
};
