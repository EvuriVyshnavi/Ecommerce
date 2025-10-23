// backend/controllers/productController.js

// asyncHandler is crucial for catching errors in async functions and passing them to Express
import asyncHandler from '../middleware/asyncHandler.js'; 
import Product from '../models/productModel.js'; 
// NOTE: Make sure the path '../models/productModel.js' is correct 
// and that the productModel.js file exists and correctly exports the Product model.

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    // 🛑 This is the line that will now work correctly 
    // if productModel.js exists and exports 'Product'.
    const products = await Product.find({});
    
    // Send the retrieved products (or an empty array if the DB is empty)
    res.json(products);
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    // Finds a product by the ID provided in the URL params
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        // Sets status to 404 (Not Found) and throws an error.
        // asyncHandler catches the throw and Express handles the 404 response.
        res.status(404);
        throw new Error('Resource not found');
    }
});

// Export all functions for use in productRoutes.js
export { 
    getProducts, 
    getProductById 
};
