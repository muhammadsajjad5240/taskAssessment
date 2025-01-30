const { StatusCodes } = require('http-status-codes');

const keys = require('../config/keys');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await userService.isPasswordMatch(user, password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const token = refreshToken?.split(' ')[1];  // Strip the "Bearer " part of the token

  const refreshTokenDoc = await prisma.token.findFirst({
    where: {
      token,
      type: keys.tokenTypes.REFRESH,
      blacklisted: false,
    },
  });

  if (!refreshTokenDoc) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Not found');
  }

  await prisma.token.delete({
    where: {
      id: refreshTokenDoc.id,
    },
  });
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
};
