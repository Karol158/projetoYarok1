const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const sequelize = require('./config/database');
const Refugiado = require('./models/Refugiado');
const Eventos = require('./models/Eventos');
const sequelizeEventos = require('./config/eventos');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

sequelizeEventos.sync({ force: false }).then(() => {
  console.log('Eventos synced!');
});
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced!');
});



app.get('/index', async (req, res) => {
    try {
      let refugiados = await Refugiado.findAll();
      refugiados = refugiados.map((refugiado) => refugiado.dataValues); 
      res.render('index', { refugiados });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar os refugiados.');
    }
  });
app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.post('/cadastro', async (req, res) => {
  const { nome,email,senha } = req.body;
  await Refugiado.create({ nome,email,senha });
  res.redirect('/home');
});



app.get('/edit/:id', async (req, res) => {
    let refugiado = await Refugiado.findByPk(req.params.id);
    refugiado = refugiado.dataValues;
    res.render('edit', { refugiado });
  });
  

  app.post('/edit/:id', async (req, res) => {
    const { nome,  email, senha } = req.body;
    await Refugiado.update({ nome, email, senha }, { where: { id: req.params.id } });
    res.redirect('/index');
  });
  



app.get('/delete/:id', async (req, res) => {
  await Refugiado.destroy({ where: { id: req.params.id } });
  res.redirect('/index');
});
app.get('/eventos',async(req,res)=>{
  res.render('eventos');
});
app.post('/eventos', async (req, res) => {
  const { nome, endereco} = req.body;

  console.log("Dados recebidos:", req.body);  // Isso vai te ajudar a ver o que está sendo enviado para o backend
  
  try {
    await Eventos.create({ nome, endereco });
    res.redirect('/home');
  } catch (error) {
    console.error("Erro ao criar evento:", error);  // Mensagem detalhada no console
    res.status(500).send(`Erro ao criar evento: ${error.message}`);  // Mostra o erro completo no navegador
  }
});



app.get('/listaeventos', async (req, res) => {
  try {
    let eventos = await Eventos.findAll();
    eventos = eventos.map((evento) => evento.dataValues); 
    res.render('listaeventos', { eventos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar os eventos.');
  }
});
app.get('/editeventos/:id', async (req, res) => {
  let evento = await Eventos.findByPk(req.params.id);
  evento = evento.dataValues;
  res.render('editeventos', {evento} );
});
app.post('/editeventos/:id', async (req, res) => {
  const { nome,  endereco } = req.body;
  await Eventos.update({ nome, endereco}, { where: { id: req.params.id } });
  res.redirect('/listaeventos');
});
app.get('/deleteeventos/:id', async (req, res) => {
  await Eventos.destroy({ where: { id: req.params.id } });
  res.redirect('/listaeventos');
});

app.get('/entrar',async(req,res)=>{
  res.render('entrar');
});
app.get('/home',async(req,res)=>{
  res.render('home');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
