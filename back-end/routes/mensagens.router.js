const express = require('express');
const router = express.Router();
const { emailParaTodos } = require('../services/emails.service');


module.exports = (io, prisma) => {
    router.post('/', async (req, res) => {
        const { remetenteEmail, destinatarioEmail, texto } = req.body;


        if (!remetenteEmail || !destinatarioEmail || !texto) {
            return res.status(400).json({ error: 'Campos obrigatórios: remetenteEmail, destinatarioEmail, texto' });
        }
        if (destinatarioEmail === 'Todos') {
            emailParaTodos(texto);
        }
        else {
            try {
                // Salva a mensagem no banco de dados
                const novaMensagem = await prisma.mensagem.create({
                    data: {
                        texto,
                        remetenteId: remetenteEmail,
                        destinatarioId: destinatarioEmail,
                    },
                });


                // Emite evento global para o front-end
                io.emit('nova-mensagem', {
                    destinatarioEmail, // para o front saber quem deve reagir
                    remetenteEmail,
                });


                return res.status(201).json({ sucesso: true });
            } catch (error) {
                console.error('Erro ao salvar mensagem:', error);
                return res.status(500).json({ error: 'Erro ao salvar mensagem' });
            }
        }
    });


    router.post('/get', async (req, res) => {
        try {
            const { remetenteEmail, destinatarioEmail } = req.body;
   
            // Busca mensagens onde remetente e destinatário estão entre os profissionais
            const mensagens = await prisma.mensagem.findMany({
                where: {
                    OR: [
                        {
                            remetenteId: remetenteEmail,
                            destinatarioId: destinatarioEmail
                        },
                        {
                            remetenteId: destinatarioEmail,
                            destinatarioId: remetenteEmail
                        }
                    ]
                },
                include: {
                    remetente: { select: { nome: true } },
                    destinatario: { select: { nome: true } }
                },
                orderBy: {
                    enviadoEm: 'desc'
                }
            });
            return res.status(200).json(mensagens);
        } catch (error) {
            console.error('Erro ao buscar mensagens entre profissionais:', error);
            return res.status(500).json({ error: 'Erro ao buscar mensagens' });
        }
    });
   
    return router;
};
