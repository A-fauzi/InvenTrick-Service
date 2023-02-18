const { findOneByCode, createProduct, findAllProduct, findOneProduct, updateProduct, deleteProduct, stockHistory, getStockHistories, createCategoryController, getAllCategories, updateCategory, deleteCategory, findsAllByUid } =
  require("../controllers/product/ProductController");
const { findAllStockHistories } = require("../controllers/product/get.stock.history");

const { authJwt } = require("../middlewares");
const controller = require("../controllers/user/user.controller");

exports.routeProduct = (app) => {

  // Product
  app.post("/product/create", [authJwt.verifyToken, authJwt.isModerator], createProduct);

  app.get("/product/all", [authJwt.verifyToken], findAllProduct);

  app.get("/product/:itemId", [authJwt.verifyToken], findOneProduct);

  app.put("/product/:itemId", [authJwt.verifyToken, authJwt.isModerator], updateProduct);

  app.delete("/product/:itemId", [authJwt.verifyToken, authJwt.isModerator], deleteProduct);

  app.get("/product", [authJwt.verifyToken], findOneByCode)

  // Stock history
  app.post("/stock-history", [authJwt.verifyToken, authJwt.isModerator], stockHistory)

  app.get("/stock-history", [authJwt.verifyToken, authJwt.isModerator], getStockHistories)

  // Category product
  app.post("/category/create", [authJwt.verifyToken, authJwt.isModerator], createCategoryController)
  app.get("/category/all", [authJwt.verifyToken, authJwt.isModerator], getAllCategories)
  app.put("/category/:categoryId", [authJwt.verifyToken, authJwt.isModerator], updateCategory)
  app.delete("/category/:categoryId", [authJwt.verifyToken, authJwt.isModerator], deleteCategory)
};
