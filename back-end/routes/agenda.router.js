const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/agenda.controller');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

router.get('/profissionais/agendamentos/:id', [jwtMiddleware, permission.getAgendamentos], userController.getAgendamentos);
router.post('/profissional/agendamento/:id', [jwtMiddleware, permission.post], userController.updateAgendamentos);
router.post('/cadastrar/agendamento', [jwtMiddleware, permission.post], userController.postAgendamentos);

module.exports = router;