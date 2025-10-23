// backend/middleware/asyncHandler.js

/**
 * Simple utility function to wrap async controller logic.
 * This ensures that any errors thrown within the async function 
 * are automatically passed to the Express error handling middleware.
 * * @param {function} fn - The asynchronous function (controller logic) to be wrapped.
 */
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
