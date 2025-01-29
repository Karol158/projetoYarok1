const sequelize = require('./config/eventos'); // Importa a instância do Sequelize

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro na conexão com o banco de dados:', error);
  });
  
