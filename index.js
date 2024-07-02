//Archivo principal de la aplicacion donde se configura e inicia el servidor

const express = require('express');   //Importa el modulo Express
const app = express();   //Crea una instancia de la aplicacion Express

const cors = require('cors');   // Middleware para habilitar CORS
const morgan = require('morgan');   // Middleware para registrar solicitudes HTTP

const sequelize = require('./src/Database/database');   //Importa la configuración de Sequelize
const productRoutes = require('./src/Routes/productRoutes');   //Importa las rutas de productos
require('dotenv').config();   //Carga las variables de entorno desde el archivo .env

app.use(cors());   //Habilita CORS para permitir solicitudes desde cualquier origen
app.use(morgan('dev'));   //Usa morgan para registrar las solicitudes HTTP
app.use(express.json());   //Middleware para parsear JSON

app.use('/productos', productRoutes);   //Usa las rutas de productos

const PORT = process.env.PORT2 || 3000;  //Define el puerto en el que el servidor escuchará las solicitudes

//Sincroniza la base de datos y arranca el servidor

sequelize.sync()   //Sincroniza el modelo con la base de datos
  .then(() => {
    console.log('Database sincronizada exitosamente');
    
    //Inicia el servidor Express para escuchar las solicitudes en el puerto especificado
    app.listen(PORT, () => {
      console.log(`El servidor esta corriendo en el puerto: ${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se puede conectar a la database:', err);   //
  });

//Definir la ruta para "/"
app.get('/', (req, res) => {
  res.send('Parcial Backend');
});

