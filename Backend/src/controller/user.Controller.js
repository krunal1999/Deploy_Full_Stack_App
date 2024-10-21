import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const options = {
  httpOnly: false,
  secure: true,
};

const generateAccessTokenWithID = async (userId) => {
  try {
    const currentUser = await User.findById(userId);
    const accessToken = await currentUser.generateAccessToken();
    currentUser.accessToken = accessToken;

    await currentUser.save({ validateBeforeSave: false });

    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Token Not Generated");
  }
};

/*
steps for registration function
1. data is validated in middleware
2. check if email is unique , if no send error
3. if yes then create the new account , send success
4. before creating hash the password, logic in user.model
5. if user is created successful send response
6. if user not created send error
*/
export const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  // console.log(` ${email} ${username} ${password}`);

  const existingUser = await User.findOne({ email });

  // console.log(existingUser);
  if (existingUser) {
    throw new ApiError(409, {}, "User Already Exist");
  }

  const newUser = await User.create({
    email,
    username,
    password,
  });

  // check if user is saved or not
  const createdUser = await User.findById(newUser._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "User Not Created Server Error");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Created"));
});

/*
Steps
1. Get the data
2. validate data
3. check if user exist
  a. if then match the passwords
  b. else throw error
4.if user exist - generate new jwt token 
5. return proper success response or error response
*/
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);

  // check if user exist or not
  const existedUser = await User.findOne({ email });

  if (!existedUser) {
    throw new ApiError(400, {}, "User not found");
  }

  // check the credential, match the password
  const matchPass = await existedUser.isPasswordCorrect(password);

  if (!matchPass) {
    throw new ApiError(401, {}, "User or Password does not match");
  }

  const accessToken = await generateAccessTokenWithID(existedUser._id);

  const loggedUser = await User.findById(existedUser._id).select("_id");

  // console.log(loggedUser);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, { loggedUser }, "user logged"));
});

export const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const existedUser = await User.findById(id).select("-password");

  const userResponse = {
    username: existedUser.username,
    email: existedUser.email,
  };

  if (!userResponse) {
    throw new ApiError(400, {}, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, userResponse, "user details"));
});

export const getUser = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const existedUser = await User.findById(id).select("-password");

  const userResponse = {
    username: existedUser.username,
    email: existedUser.email,
  };

  if (!userResponse) {
    throw new ApiError(400, {}, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, userResponse, "user details"));
});
