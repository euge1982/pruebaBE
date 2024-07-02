//Archivo que define el modelo 'Producto'

const { DataTypes } = require("sequelize");
const sequelize = require("../Database/database.js");  //Importa la instancia de Sequelize que ya se creo

//Construcción de las tablas de la base de datos
//Se define como va a ser el producto

const Product = sequelize.define('producto', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,  //Es autoincrementable
        primaryKey: true,  //Es clave primaria
        allowNull:false  //No se permiten valores nulos
    },
    nombre:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    categoria:{
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    precio:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,  
    },
}, {
    tableName: 'productos',  //Es el nombre de la tabla en la base de datos
    timestamps: false,  //Desactiva los timestamp (createdAt, updateAt)
    }
);


module.exports = Product; //Exporta el modelo 'Product' para que pueda ser utilizado en otros módulos