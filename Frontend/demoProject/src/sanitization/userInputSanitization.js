import validator from "validator";

// Sanitization for registration form
export const sanitizeRegistrationData = (data) => ({
  username: validator.escape(data.username.trim()),
  email: validator.normalizeEmail(data.email.trim()),
  password: data.password.trim(),
  confirmPassword: data.confirmPassword.trim(),
});

// Sanitization for login form
export const sanitizeLoginData = (data) => ({
  email: validator.normalizeEmail(data.email.trim()),
  password: data.password.trim(),
});
