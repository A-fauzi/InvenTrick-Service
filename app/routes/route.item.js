exports.routeItems = (app) => {
  const ItemsController = require("../controllers/items/contorller.items.js");

  app.post("/item/create", ItemsController.create);

  app.get("/item/get-all", ItemsController.findAll);

  app.get("/item/:itemId", ItemsController.findOne);

  app.put("/item/:itemId", ItemsController.update);

  app.delete("/item/:itemId", ItemsController.delete);
};
