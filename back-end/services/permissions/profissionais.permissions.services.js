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
module.exports = {get};