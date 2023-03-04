const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/product/model.product.js");
const { successMessage } = require("../../custom-response/response.success.js");

exports.findAll = async (req, res, next) => {
  try {
    // We destructure the req.query object to get the page and limit variables from url 
    const { page = 1, limit = 10 } = req.query;

    const item = await Item.find({ ...req.query })
      // We multiply the "limit" variables by one just to make sure we pass a number and not a string
      .limit(limit * 1)
      // I don't think i need to explain the math here
      .skip((page - 1) * limit)
      // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
      .sort({ createdAt: -1 })

    // Getting the numbers of products stored in database
    const count = await Item.countDocuments();

    return res.status(200).json({
      message: "data items",
      totalCount: count,
      countPerPage: `${item.length}`,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: item,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving item.",
    });
    // next(err);
  }
};
