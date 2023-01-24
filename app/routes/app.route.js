const { routeExample } = require("./route.example");
const { routeItems } = require("./route.item");
const { routeUsers } = require("./route.users");

exports.routes = (app) => {
  routeExample(app);
  routeUsers(app);
  routeItems(app);
};
