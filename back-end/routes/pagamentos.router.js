const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/pacientes.controller.js');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

router.post('/registrar/pagamentos/:id', [jwtMiddleware, permission.post]);

module.exports = router;