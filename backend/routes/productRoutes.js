import express from 'express'
import formidable from 'express-formidable'
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';
import {addProduct, updateProduct, removeProduct, fetchProductById, fetchAllProducts, addProductReview, fetchNewProducts, fetchTopProducts, filterProducts} from '../controllers/productController.js';

const router = express.Router()
// create product
router.route('/').post(authenticate, authorizeAdmin, formidable(), addProduct)
// show all products
router.route("/allproducts").get(fetchAllProducts);
// show top & new products on Home page
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
// get, update and delete a particular item by Id
router
.route('/:id')
.get(fetchProductById)
.patch(authenticate, authorizeAdmin, formidable(), updateProduct)
.delete(authenticate, authorizeAdmin, formidable(), removeProduct)
// filtered-products
router.route('/filtered-products').post(filterProducts)

// review routes
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

export default router;