exports.routeUsers = (app) => {
  const UsersController = require("../controllers/users/controller.users.js");

  app.post("/user/create", UsersController.create);

  app.get("/user/get-all", UsersController.findAll);

  app.get("/user/:userId", UsersController.findOne);

  app.put("/user/:userId", UsersController.update);

  app.delete("/user/:userId", UsersController.delete);
};
