//Archivo de configuracion de Sequelize para conectar con la DB

const { Sequelize } = require('sequelize');   //Importa Sequeliza desde la biblioteca 'sequelize'
require('dotenv').config();   //Importa y configura las variables de entorno desde el .env

//Creacion de una instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,   //Nombre de la DB
  process.env.DB_USER,   //Usuario de la DB
  "",   //Contraseña de la DB, que es vacia
  {
    host: process.env.DB_HOST,   //Host de la DB
    dialect: 'mysql',   //Dialecto de la DB
    port: process.env.PORT   //Puerto en el que corre la DB (3306)
  }
);

//Autenticacion de la DB
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;   //Exporta la instancai de Sequelize para que otros modulos la puedan usar

