const moment = require('moment');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const keys = require('../config/keys');

const prisma = new PrismaClient();

/**
 * Generate token
 * @param {string} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken =async (userId, expires, type, secret = keys.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return await jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {string} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Object>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  
  const tokenDoc = await prisma.token.create({
    data: {
      token,
      userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    },
  });
  return tokenDoc;
};


const findToken = async (filter) => {
  const tokenDoc = await prisma.token.findFirst({
    where: {
      userId: filter.user,
      blacklisted: filter.blacklisted,
    },
  });

  if (!tokenDoc) {
    throw new Error('Token not found');
  }

  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {Object} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(keys.jwt.accessExpirationMinutes, 'minutes');
  const accessToken =await generateToken(user.id, accessTokenExpires, keys.tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(keys.jwt.refreshExpirationDays, 'days');
  const refreshToken = await generateToken(user.id, refreshTokenExpires, keys.tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, keys.tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  saveToken,
  generateAuthTokens,
  findToken
};
