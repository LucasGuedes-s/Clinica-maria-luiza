const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/pacientes.controller.js');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

router.get('/pacientes', [jwtMiddleware, permission.get], userController.getPacientes);

router.get('/consulta/paciente', [jwtMiddleware, permission.get], userController.getConsultas);
router.post('/cadastrar/pacientes', [jwtMiddleware, permission.post], userController.postPacientes);
router.post('/consulta/registrar', [jwtMiddleware, permission.postProfissionais], userController.postConsulta);

module.exports = router;