import express, { request, response } from "express";
import ProductManager from "./ProductManager";


const app = express();
const port =8080; 

// Crear una instancia de ProductManager con el archivo de productos
const productosManager = new ProductManager('productos.json'); 

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
    const { limit } = req.query;
    const products = ProductManager.getProducts();

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        return res.json(limitedProducts);
    }

    res.json(products);
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const product = ProductosManager.getProductById(parseInt(pid));

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
});


