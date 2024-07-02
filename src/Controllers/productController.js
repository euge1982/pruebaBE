//Archivo que contiene el CRUD para el modelo 'Producto'

const Product = require("../Models/product");
const { Op } = require('sequelize');   //Operadores para consultas avanzadas

//Crear un nuevo producto
/*POSTMAN POST localhost:3000/productos en body, raw, json y se manda un objeto entre llaves
send y devuelve el articulo creado, o un msj de error*/
exports.createProduct = async (req, res) => {
  try {
    const newArt = {   //Constante que almacena el nuevo articulo
      nombre: req.body.nombre,
      precio: req.body.precio,
      cantidad: req.body.cantidad,
      categoria: req.body.categoria,
    };
    const product = await Product.create(newArt);   //Crea un nuevo producto con la constante anterior
    res.status(201).json(product);   //Responde con el producto creado y el código de estado 201 (Creado)
  } 
  catch (err) {
    res.status(500).json({ error: err.message });   //Responde con un error 500 en caso de falla
  }
};

//Obtener todos los productos
/*POSTMAN GET localhost:3000/productos, send y muestra todos los productos que hay en la base de datos*/
exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.findAll();   //Obtiene todos los productos
    res.status(200).json(product);   //Responde con un array de productos y el código de estado 200 (OK)
  } 
  catch (err) {
    res.status(500).json({ error: err.message });   //Responde con un error 500 en caso de falla
  }
};

//Obtener un producto por su id
/*POSTMAN GET localhost:3000/productos/:id y en params, 
en la parte de Path Variables aparece id y se pone el value que se quiere obtener*/
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);   //Obtiene un producto por su id
    if (product) {
      res.status(200).json(product);   //Responde con el producto y el código de estado 200 (OK)
    } 
    else {
      res.status(404).json({ error: 'Producto no encontrado' });   //Responde con un error 404 si el producto no existe
    }
  } 
  catch (err) {
    res.status(500).json({ error: err.message });   //Responde con un error 500 en caso de falla
  }
};

//Actualizar un producto por su id
/*POSTMAN PUT localhost:3000/productos/:id, en params Path Variable id value:idQueQuieroActualizar 
y en el body, raw, json, los datos que corresponden como un objeto, entre llaves*/
exports.updateProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id); // Obtiene un producto por su id
    if (product) {
      await product.update(req.body); // Actualiza el producto con los datos del cuerpo de la solicitud
      res.status(200).json(product); // Responde con el producto actualizado y el código de estado 200 (OK)
    } 
    else {
      res.status(404).json({ error: 'Product not found' }); // Responde con un error 404 si el producto no existe
    }
  } 
  catch (err) {
    res.status(500).json({ error: err.message }); // Responde con un error 500 en caso de falla
  }
};

//Eliminar un producto por su id
/*POSTMAN DELETE localhost:3000/productos/:id, en params Path Variables(Variables de ruta) id value:idQueQuieroEliminar*/
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);   //Obtiene un producto por su id
    if (product) {
      await product.destroy();   //Elimina el producto
      res.status(200).json({   //Responde con el código de estado 204 y un msj de que se elimino el producto
        message: "Producto eliminado con éxito"
      }
    )
    }
    else {
      res.status(404).json({ error: 'Producto no encontrado' });   //Responde con un error 404 si el producto no existe
    }
  } 
  catch (err) {
    res.status(500).json({ error: err.message });   //Responde con un error 500 en caso de falla
  }
};

// Obtener productos ordenados
/*POSTMAN GET localhost:3000/productos/ordenados, en params key:criterio value:nombre,precio,cantidad*/
exports.getProductosOrdenados = async (req, res) => {
  try {
    const { criterio } = req.query;   //Obtiene el criterio de ordenación de los parámetros de consulta
    const validCriterios = ['nombre', 'precio', 'cantidad'];   //Criterios válidos para la ordenación
    if (validCriterios.includes(criterio)) {
      const productos = await Product.findAll({ order: [[criterio, 'ASC']] });   //Obtiene los productos ordenados por el criterio especificado
      res.status(200).json(productos);   //Responde un array de productos ordenados y el código de estado 200 (OK)
    }
    else {
      res.status(400).json({ error: 'Invalid sorting criterion' });   //Responde con un error 400 si el criterio no es válido
    }
  } 
  catch (err) {
    res.status(500).json({ error: err.message });   //Responde con un error 500 en caso de falla
  }
};

//Obtener productos filtrados
/*POSTMAN GET localhost:3000/productos/filtrados, en params key:precioMin value:precioQueSeQuiera,
key:categoria value:categoriaQueSeQuiera*/
exports.getProductosFiltrados = async (req, res) => {
  try {
    
    const { precioMin, categoria } = req.query;   //Obtiene los filtros de los parámetros de consulta
    
    const filters = {};
    if (precioMin) { 
      filters.precio = { [Op.gte]: parseFloat(precioMin) }; //Aplica el filtro de precio mínimo//Op.gte:Es un operador de Sequelize que significa "mayor o igual que"
    }
      
    if (categoria) {
      filters.categoria = categoria;   //Aplica el filtro de categoría
    }
    
    const product = await Product.findAll({ where: filters });   //Obtiene los productos filtrados
    res.status(200).json(product);   //Responde con el array de productos filtrados y el código de estado 200 (OK)
  } 
  catch (err) {
    res.status(500).json({ error: err.message });   //Responde con un error 500 en caso de falla
  }
};