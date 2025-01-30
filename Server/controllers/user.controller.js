const {
	StatusCodes
} =  require('http-status-codes');
const catchAsync = require('../utils/catchAsync');
const { userService,tokenService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(StatusCodes.CREATED).send({ user ,tokens});

});

module.exports = {
  createUser,
};
