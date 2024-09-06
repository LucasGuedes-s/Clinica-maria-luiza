const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: '*', // Ajuste para a origem do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true, // Se você estiver lidando com cookies
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Authorization, content-type");
  res.header("Access-Control-Expose-Headers", "Authorization, content-type");
  next();
});

const firstRun = require('./firstRun.util.js');
firstRun.FirstRun();

//ROTAS

app.get('/', (req, res) => {
  res.send('Teste - clínica Maria Luiza')
})

const UserRouter = require('./routes/user.router.js');
const profissionaisRouter = require('./routes/profissionais.router.js');
const pacientesRouter = require('./routes/pacientes.router.js');
const agendaRouter = require('./routes/agenda.router.js');
const consultasRouter = require('./routes/consultas.router.js');
const pagamentosRouter = require('./routes/pagamentos.router.js');
const pdfsRouter = require('./routes/pdfs.router.js');

app.use(UserRouter, profissionaisRouter, pacientesRouter, agendaRouter, consultasRouter, pagamentosRouter, pdfsRouter)

const hostname = 'localhost';
app.listen(port, () => {
  console.log(`Servidor iniciado em http://${hostname}:${port} (Clique Ctrl+C)`)
})