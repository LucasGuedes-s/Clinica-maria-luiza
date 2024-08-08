const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router()

router.post('/user/login', userController.LoginUsuario);
router.get('/agenda/:id');

module.exports = router;