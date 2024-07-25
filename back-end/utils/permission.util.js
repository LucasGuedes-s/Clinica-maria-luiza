const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function verificarPermissions(usuario, permission_id) {
    /*const user = await prisma.Profissionais.findFirst({
        where:{
            email: usuario.email
        }
    });*/
    console.log(permission_id)
    console.log(usuario)
    for(let i in permission_id){
        console.log("Aqui")
        if (usuario.permissao === permission_id[i]) {
            console.log(permission_id[i], usuario.permissao)
            console.log("Autorizado")
            return 'Autorizado';
        }
    }
    err = new Error('Permissao negada.');
    err.code = 401;
    err.statusCode = 401;
    throw err;
    
}

module.exports = verificarPermissions;