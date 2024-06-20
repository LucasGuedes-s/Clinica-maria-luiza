const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Teste - clínica MARIA LUIZA')
})

const hostname = 'localhost';
app.listen(port, () => {
  console.log(`Servidor iniciado em http://${hostname}:${port} (Clique Ctrl+C)`)
})