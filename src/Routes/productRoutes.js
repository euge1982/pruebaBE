//Archivo que define las rutas relacionadas con el modelo 'Producto'
//Y las asocia con los metodos del controlador que corresponde

const express = require('express');   //Importa Express
const router = express.Router();   //Crea un enrutador
const controlador = require ('../Controllers/productController.js');  //Importa el controlador de productos

//Rutas para las operaciones especiales
router.get('/ordenados', controlador.getProductosOrdenados);
router.get('/filtrados', controlador.getProductosFiltrados); 

/*Si una ruta más específica o con parámetros dinámicos (como /:id) se define antes de rutas más generales, 
como /ordenados, Express podría malinterpretar la ruta /ordenados como un parámetro dinámico (id en este caso).
Por eso se pusieron arriba las rutas especiales*/

//Rutas para el CRUD
router.post('/', controlador.createProduct);   //Crea un nuevo producto
router.get('/', controlador.getAllProducts);   //Obtiene todos los productos
router.get('/:id', controlador.getProductById);   //Obtiene el producto con un id especifico
router.put('/:id', controlador.updateProductById);   //Actualiza un producto con un id dado
router.delete('/:id', controlador.deleteProductById);   //Elimina un producto con un id dado

module.exports = router;
