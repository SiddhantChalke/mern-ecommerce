import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    // console.log(name);
    // take data from admin and check
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      // case !category:
      //   return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }
    // create a new Product with above details in DB
    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);

  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// Update
const updateProduct = asyncHandler(async (req, res) => {
  // try {
    // const { name, description, price, category, quantity, brand } = req.fields;

    // Check
    // switch (true) {
    //   case !name:
    //     return res.json({ error: "Name is required" });
    //   case !brand:
    //     return res.json({ error: "Brand is required" });
    //   case !description:
    //     return res.json({ error: "Description is required" });
    //   case !price:
    //     return res.json({ error: "Price is required" });
    //   case !category:
    //     return res.json({ error: "Category is required" });
    //   case !quantity:
    //     return res.json({ error: "Quantity is required" });
    // }

    // const product = await Product.findByIdAndUpdate(
    //   req.params.id,
    //   { ...req.fields },
    //   { new: true }
    // );

    // await product.save();
    // res.json(product);

  // } catch (error) {
  //   console.error(error);
  //   res.status(400).json(error.message);
  // }
  try {
    const productId = req.params.id;
    // Check if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }
    // Check if productId is defined
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    // update and return the updated document...no need to .save()
    const product = await Product.findByIdAndUpdate(
      productId,
      { ...req.fields },
      { new: true }
    );

    // Check if product is found
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Delete product
const removeProduct = asyncHandler(async (req, res) => {
  
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get 6 products for home page
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    // show only six products
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});
// get single product by id for search
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});
// get all products for store
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    // find all with limit of 12 items and sort in descending order of date of creation
    const products = await Product.find({})
      // .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Create reviews
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // check if the user has already reviewed
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      // reviews in product schema is an empty array,...push the new review
      product.reviews.push(review);
      // no. of reviews the product has got
      product.numReviews = product.reviews.length;

      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    // Extract 'checked' and 'radio' from the request body
    const { checked, radio } = req.body;

    // to store filtering arguments for the MongoDB query
    let args = {};

    // If there are selected categories (checked array is not empty), add 'category' to the filter arguments
    if (checked.length > 0) args.category = checked;

    // If there is a selected price range (radio array is not empty), add 'price' to the filter arguments
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    // Use the filtering arguments to query the 'Product' collection in the database
    const products = await Product.find(args);
    
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


export {
  addProduct,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
