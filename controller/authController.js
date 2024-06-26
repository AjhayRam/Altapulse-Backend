const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createTokenUser = require("../utils/createTokenUser");
const { createJWT } = require("../utils/jwt");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !name || !role) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create({ name, email, password, role });

  const tokenUser = createTokenUser(user);
  const token = createJWT({ payload: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);
  const token = createJWT({ payload: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser, token: token });
};

const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "User Logged Out!" });
};

module.exports = {
  register,
  login,
  logout,
};
