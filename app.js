const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const rotasToken = require('./rotas/token');
const rotasRotinas = require('./rotas/rotina_rotas');
const usuarioRotas = require('./rotas/usuario_rotas');

const middleware = require('./middleware/auth');

//Configuração do Mongoose
mongoose.connect('mongodb://localhost/app_registro', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(()=> {
    console.log('BD conectado');
  })
  .catch((error)=> {
    console.log('Error ao conectar ao BD', error);
  });
mongoose.Promise = global.Promise;

app.use('/api/token', rotasToken)
app.use(middleware.validarToken)
app.use('/api/rotinas',rotasRotinas);
app.use('/api/usuarios',usuarioRotas)

app.listen(port, () => {
    console.log(`Iniciando o servidor: http://localhost:${port}`)
  })