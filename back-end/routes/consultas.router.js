const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/pacientes.controller.js');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

router.get('/consulta/paciente/:cpf', [jwtMiddleware, permission.getDados], userController.getConsultas);
router.post('/consulta/registrar', [jwtMiddleware, permission.postProfissionais], userController.postConsulta);
router.post('/consultaAba/registrar', [jwtMiddleware, permission.postProfissionais], userController.postConsultaAba);

module.exports = router;

