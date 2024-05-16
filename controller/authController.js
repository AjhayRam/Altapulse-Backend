const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createTokenUser = require("../utils/createTokenUser");

const { createJWT } = require("../utils/jwt");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);
  const token = createJWT({ payload: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: user, token: token });
};

const login = async (req, res) => {
  res.send("login");
};

const logout = async (req, res) => {
  res.send("Logout");
};

module.exports = {
  register,
  login,
  logout,
};
