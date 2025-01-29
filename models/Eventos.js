const { DataTypes } = require('sequelize');
const sequelizeEventos = require('../config/eventos'); 


const Eventos = sequelizeEventos.define('Evento', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

module.exports = Eventos;

