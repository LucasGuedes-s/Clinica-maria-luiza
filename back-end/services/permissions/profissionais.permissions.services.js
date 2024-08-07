const verificarPermissoes = require('../../utils/permission.util.js');
const permissions = require('../../config/permissions.config.js')

async function get(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.TODOS);
        next(); 
    } catch (err) {
        next(err);
    }
}

async function post(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.TODOS);
        next(); 
    } catch (err) {
        next(err);
    }
}
async function postProfissionais(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.PERMISSAO_PROFISSIONAL);
        next(); 
    } catch (err) {
        next(err);
    }
}
async function postProfissional(req, res, next) {
    try {
        await verificarPermissoes(req.user, permissions.PERMISSAO_ADMIN);
        next(); 
    } catch (err) {
        next(err);
    }
}
module.exports = {get, post, postProfissionais, postProfissional};