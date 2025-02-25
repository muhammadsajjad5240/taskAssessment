const { StatusCodes } = require('http-status-codes');

const catchAsync = require('../utils/catchAsync');
const { authService,  tokenService } = require('../services');

const login = catchAsync(async (req, res) => {
  console.log('start')

  const { email, password } = req.body;
  console.log('req.body',req.body)
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  console.log('user',user)

  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.headers?.authorization);
  res.status(StatusCodes.OK).send({message:"Logout Successfully"});
});

module.exports = {
  login,
  logout,
};
