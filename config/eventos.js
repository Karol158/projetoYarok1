const{Sequelize}=require('sequelize');
const sequelizeEventos =new Sequelize({
 dialect:'sqlite',
 storage:'Eventos.sqlite',
});
module.exports=sequelizeEventos;
