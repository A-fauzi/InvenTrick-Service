exports.routeExample = (app) => {
  const ExampleControllers = require("../controllers/example/controller.example.js");

  app.post("/create", ExampleControllers.create);

  app.get("/get-all", ExampleControllers.findAll);

  app.get("/message/:messageId", ExampleControllers.findOne);

  app.put("/message/:messageId", ExampleControllers.update);

  app.delete("/message/:messageId", ExampleControllers.delete);
};
