const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const keys = require('../config/keys');
const { tokenService ,userService} = require('../services');

const jwtOptions = {
  secretOrKey: keys.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {

    const token = await tokenService.findToken({user:payload.sub,blacklisted:false})
    if(!token)
      return done(new Error('Please authenticate'), false);

    
    if (payload.type !== keys.tokenTypes.REFRESH) {
      throw new Error('Invalid token type');
    }
    const user = await userService.getUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
