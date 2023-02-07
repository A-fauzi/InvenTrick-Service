const { findOneByCode, createProduct, findAllProduct, findOneProduct, updateProduct, deleteProduct, stockHistory } = require("../controllers/product/ProductController");

exports.routeProduct = (app) => {

  // Product
  app.post("/product/create", createProduct);

  app.get("/product/all", findAllProduct);

  app.get("/product/:itemId", findOneProduct);

  app.put("/product/:itemId", updateProduct);

  app.delete("/product/:itemId", deleteProduct);

  app.get("/product/", findOneByCode)

  // Stock history
  app.post("/product/stock-history", stockHistory)
};

