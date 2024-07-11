const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/profissionais.controller');
const router = express.Router()

router.get('/profissionais', jwtMiddleware, userController.getProfissionais);

module.exports = router;