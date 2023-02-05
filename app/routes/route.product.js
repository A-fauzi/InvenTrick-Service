const { createProduct, findAllProduct, findOneProduct, updateProduct, deleteProduct } = require("../controllers/product/ProductController");

exports.routeProduct = (app) => {

  app.post("/product/create", createProduct);

  app.get("/product/all", findAllProduct);

  app.get("/product/:itemId", findOneProduct);

  app.put("/product/:itemId", updateProduct);

  app.delete("/product/:itemId", deleteProduct);
};

