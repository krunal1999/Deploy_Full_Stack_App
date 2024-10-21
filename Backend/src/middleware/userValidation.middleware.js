import { registerSchema, loginSchema } from "../validation/userValidation.js";
import ApiError from "../utils/ApiError.js";

// validate incoming data using Joi
const validateRegistration = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json(new ApiError(400, errorMessages, error));
  }
  console.log("validation checked");
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json(new ApiError(400, errorMessages, error));
  }

  next();
};

export { validateRegistration, validateLogin };
