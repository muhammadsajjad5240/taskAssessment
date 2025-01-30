//prod keys here
module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.EXPIRATION_DAYS,
  },
   tokenTypes : {
    ACCESS: 'access',
    REFRESH: 'refresh',
  }
  
};
