const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function getProfissionais(){   
    const profissionais = await prisma.Profissionais.findMany();
    return profissionais;

}

module.exports = {getProfissionais};