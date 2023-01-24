const { routeExample } = require("./route.example");
const { routeUsers } = require("./route.users");

exports.routes = (app) => {
  routeExample(app);
  routeUsers(app);
};
