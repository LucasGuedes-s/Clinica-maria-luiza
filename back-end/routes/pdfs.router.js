const express = require('express');
const jwtMiddleware = require('../middlewares/auth')
const pdfController = require('../controllers/pdfs.controller.js');
const permission = require('../services/permissions/profissionais.permissions.services')
const router = express.Router()

router.get('/historico/consultas', pdfController.getpdfConsultas);

module.exports = router;