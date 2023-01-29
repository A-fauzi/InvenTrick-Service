const { routeProduct } = require("./route.product");
const { routeUsers } = require("./route.users");

exports.routes = (app) => {
  routeUsers(app);
  routeProduct(app)
};
