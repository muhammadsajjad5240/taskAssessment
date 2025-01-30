const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/login',validate(authValidation.login),  authController.login);
router.post('/logout',auth(),  authController.logout);

module.exports = router;