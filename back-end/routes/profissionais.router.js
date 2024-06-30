const express = require('express');
const jwtMiddleware = require('../services/auth.service')
const userController = require('../controllers/pacientes.controller');
const router = express.Router()

router.get('/profissionais', jwtMiddleware, userController.getPacientes);

module.exports = router;