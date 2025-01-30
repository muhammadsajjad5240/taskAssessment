
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { StatusCodes } = require('http-status-codes');

require('dotenv').config();
const keys = require('./config/keys');
const ApiError = require('./utils/ApiError');
const { jwtStrategy } = require('./config/passport');
const { errorConverter, errorHandler } = require('./middlewares/error');



const PORT = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== 'production';

const startServer = async () => {

  const server = express();

  if (!dev) {
    server.use((req, res, next) => {
      const proto = req.headers['x-forwarded-proto'];
      if (proto === 'https') {
        res.set({ 'Strict-Transport-Security': 'max-age=31557600' });
        return next();
      }
      res.redirect('https://' + req.headers.host + req.url);
    });
  }

  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  }));

  
  
// enable cors
server.use(cors());
server.options('*', cors());

  
  // jwt authentication
server.use(passport.initialize());
server.use(passport.session());
passport.use('jwt', jwtStrategy);


server.get('/hello',(req,res,next)=>{
  res.send('<p>Hello World</p>')
})

  const getRoutes = require('./routes/index.js');
  server.use('/api', getRoutes);

  // send back a 404 error for any unknown api request
server.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
server.use(errorConverter);

// handle error
server.use(errorHandler);


  server.listen(PORT, (err) => {
    if (err) {
      console.error('Server failed to start:', err);
      process.exit(1);
    }
    console.log(`> Ready on ${PORT}`);
  });
};

startServer();
