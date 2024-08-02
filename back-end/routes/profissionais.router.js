const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/profissionais.controller');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

router.post('/cadastrar/profissional', [jwtMiddleware, permission.postProfissional], userController.postProfissional);
router.get('/profissionais', [jwtMiddleware, permission.get], userController.getProfissionais);
router.get('/profissional/:id',[jwtMiddleware, permission.get], userController.getProfissional);
router.get('/profissionais/agendamentos', [jwtMiddleware, permission.get], userController.getAgendamentos);


module.exports = router;