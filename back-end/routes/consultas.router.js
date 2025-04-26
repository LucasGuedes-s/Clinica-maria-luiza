const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/pacientes.controller.js');
const consultaController = require('../controllers/consultas.controller.js')
const permission = require('../services/permissions/profissionais.permissions.services')

const router = express.Router()

//router.get('/consultas/paciente/:cpf', userController.getConsultas);
router.get('/todas/consultas', consultaController.getTodasConsultas);

router.get('/consulta/paciente/:cpf', [jwtMiddleware], userController.getConsultas);
router.get('/consultasAba/paciente/:cpf', [jwtMiddleware], userController.getConsultasAba); //aqui

router.get('/apagar/consulta/:id', [jwtMiddleware, permission.apagar], userController.deleteConsultaAba);

router.post('/consulta/registrar', [jwtMiddleware, permission.postConsulta], userController.postConsulta);
router.post('/consultaAba/registrar', [jwtMiddleware, permission.postConsulta], userController.postConsultaAba);
router.post('/adicionar/estimulo', consultaController.postEstimulos);
router.post('/vincular/estimulo', consultaController.vincularEstimulo);


router.get('/consultas/total', consultaController.getTotalConsultas);
router.get('/consultas/profissional/:email', consultaController.getConsultasProfissional);
router.get('/consultas', consultaController.getConsultasPorProfissional);

router.get('/consultas/paciente/:cpf', consultaController.getConsultasPorPaciente);
router.get('/estimulos', consultaController.getEstimulos);
router.get('/estimulos/paciente/:cpf', consultaController.getEstimulosPorPaciente);

router.put('/editar/consulta', consultaController.updateConsulta);
router.put('/alterar/estimulo', consultaController.updateEstimulo);

module.exports = router;

