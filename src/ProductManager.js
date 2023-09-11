import express, { request, response } from "express";
export default class ProductManager{}

const ProductManager = require('./ProductManager'); // Asegúrate de que la ruta sea correcta

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.productos = [];
        this.lastProductId = 0;
        this.loadProductsFromFile();
    }

    loadProductsFromFile() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.productos = JSON.parse(data);
            if (this.productos.length > 0) {
                this.lastProductId = this.productos[this.productos.length - 1].id;
            }
        } catch (error) {
            
        }
    }

    saveProductsToFile() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.productos, null, 2));
    }

    addProduct(producto) {
        this.lastProductId++;
        producto.id = this.lastProductId;
        this.productos.push(producto);
        this.saveProductsToFile();
    }

    getProducts() {
        return this.productos;
    }

    getProductById(id) {
        const producto = this.productos.find(producto => producto.id === id);
        return producto;
    }

    updateProduct(id, updatedFields) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos[index] = { ...this.productos[index], ...updatedFields };
            this.saveProductsToFile();
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos.splice(index, 1);
            this.saveProductsToFile();
            return true;
        }
        return false;
    }
}


const productManager = new ProductManager('product.json');

productManager.addProduct(producto1);
productManager.addProduct(product2);

console.log("Lista de productos:");
console.log(productosManager.getProducts());

const foundProduct = productManager.getProductById(1); 
if (foundProduct) {
    console.log("\nProducto encontrado:");
    console.log(foundProduct);
}

const updatedFields = {
    price: 1200,
    stock: 15
};

productManager.updateProduct(1, updatedFields); 
console.log("\nLista de productos actualizada:");
console.log(productManager.getProducts());

const deleted = productManager.deleteProduct(2); 
if (deleted) {
    console.log("\nProducto eliminado. Lista de productos actualizada:");
    console.log(productManager.getProducts());
}  