const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Teste - clínica Maria Luiza')
})
app.use(express.json());

//const firstRun = require('./firstRun.util.js');
//firstRun.FirstRun();

//ROTAS
const UserRouter = require('./routes/user.router.js');
const profissionaisRouter = require('./routes/profissionais.router.js');
const pacientesRouter = require('./routes/pacientes.router.js');

app.use(UserRouter, profissionaisRouter, pacientesRouter)

const hostname = 'localhost';
app.listen(port, () => {
  console.log(`Servidor iniciado em http://${hostname}:${port} (Clique Ctrl+C)`)
})