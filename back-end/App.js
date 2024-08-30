const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.get('/', (req, res) => {
  res.send('Teste - clínica Maria Luiza')
})
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Authorization, content-type");
  res.header("Access-Control-Expose-Headers", "Authorization, content-type");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const firstRun = require('./firstRun.util.js');
firstRun.FirstRun();
const origin = [
  'http://localhost:8080',
  'https://clinica-maria-luiza-pzxbvq6wa-clinica-maria-luizas-projects.vercel.app'
];

const allowedOrigins = [
  'http://localhost:8080',
  'https://clinica-maria-luiza-pzxbvq6wa-clinica-maria-luizas-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Error no cors'));
    }
  },
  credentials: true, // Caso esteja utilizando cookies ou autenticação baseada em sessões.
}));

//ROTAS
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