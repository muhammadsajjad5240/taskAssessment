const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');

const ApiError = require('../utils/ApiError');  

const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: userBody.email },
  });

  if (existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken');
  }

  // Create a new user
  userBody.password = await hashPassword(userBody.password)
  const user = await prisma.user.create({
    data: userBody,
  });

  return user;
};


const hashPassword = async(password) => {
    return await bcrypt.hash(password, 8);
  
};


/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
};


/**
 * Get user by id
 * @param {string} userId
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id:userId },
  });

  return user;
};


/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
const isPasswordMatch = async  (user,password) => {
  return await bcrypt.compare(password,user.password);
};

module.exports = {
  getUserById,
  createUser,
  getUserByEmail,
  isPasswordMatch
};
