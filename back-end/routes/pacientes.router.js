const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/pacientes.controller.js');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

//router.get('/pacientes/historico/:id', userController.getConsultas);

router.get('/pacientes', [jwtMiddleware, permission.getPacientes], userController.getPacientes);
router.post('/cadastrar/pacientes', /*[jwtMiddleware, permission.post],*/ userController.postPacientes);
router.post('/dados/pacientes', [jwtMiddleware, permission.post], userController.postDados);

module.exports = router;