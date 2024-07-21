const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function verificarPermissions(usuario, permission_id) {
    const user = await prisma.Profissionais.findFirst({
        where:{
            email: usuario.email
        }
    });
    try{
        for(i in permission_id){
            if (user.permissaoId === permission_id[i]) {
                return 'Autorizado';
            } 
        }
    } catch{
        err = new Error('Permissao negada.');
        err.code = 401;
        err.statusCode = 401;
        throw err;
    }
}

module.exports = verificarPermissions;