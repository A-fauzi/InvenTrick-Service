const { findOneByCode, createProduct, findAllProduct, findOneProduct, updateProduct, deleteProduct, stockHistory, getStockHistories, createCategoryController, getAllCategories, updateCategory, deleteCategory, findsAllByUid } =
  require("../controllers/product/ProductController");
const { findAllStockHistories } = require("../controllers/product/get.stock.history");

const { authJwt } = require("../middlewares");
const controller = require("../controllers/user/user.controller");

exports.routeProduct = (app) => {

  // app.get("/api/test/all", controller.allAccess);

  //   app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  //   app.get(
  //       "/api/test/mod",
  //       [authJwt.verifyToken, authJwt.isModerator],
  //       controller.moderatorBoard
  //   );

  //   app.get(
  //       "/api/test/admin",
  //       [authJwt.verifyToken, authJwt.isAdmin],
  //       controller.adminBoard
  //   );

  // Product
  app.post("/product/create", [authJwt.verifyToken, authJwt.isAdmin], createProduct);

  app.get("/product/all", [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], findAllProduct);

  app.get("/product/:itemId", [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], findOneProduct);

  app.put("/product/:itemId", [authJwt.verifyToken, authJwt.isAdmin], updateProduct);

  app.delete("/product/:itemId", [authJwt.verifyToken, authJwt.isAdmin], deleteProduct);

  app.get("/product", [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], findOneByCode)

  // Stock history
  app.post("/stock-history", [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], stockHistory)

  app.get("/stock-history", [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], getStockHistories)

  // Category product
  app.post("/category/create", [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], createCategoryController)
  app.get("/category/all", [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], getAllCategories)
  app.put("/category/:categoryId", [authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], updateCategory)
  app.delete("/category/:categoryId", [authJwt.verifyToken, authJwt.isAdmin], deleteCategory)
};
