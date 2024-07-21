const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const userController = require('../controllers/profissionais.controller');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

router.get('/profissionais', [jwtMiddleware, permission.get], userController.getProfissionais);

module.exports = router;