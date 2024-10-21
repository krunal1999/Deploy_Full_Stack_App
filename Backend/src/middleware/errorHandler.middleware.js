import ApiError from "../utils/ApiError.js";


// Handle all the error 
const errorHandler = (err, req, res, next) => {
  console.error(err);
  // console.log(" error was caught in middleware");
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json(new ApiError(err.statusCode, message, err));
};

export default errorHandler;
