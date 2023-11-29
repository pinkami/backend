const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.loadProducts();
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      throw new Error("Código de producto repetido");
    }

    product.id = this.generateUniqueId();
    this.products.push(product);
    this.saveProducts();
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    // Actualizar campos sin modificar el ID
    this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
    this.saveProducts();
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    this.products.splice(productIndex, 1);
    this.saveProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  generateUniqueId() {
    return Date.now();
  }
}

// Crear una instancia de ProductManager con un archivo de datos
const productManager = new ProductManager('productos.json');

// Obtener productos (debería devolver [])
console.log(productManager.getProducts());

// Agregar un producto
try {
  productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  // Obtener productos nuevamente (debería devolver el producto agregado)
  console.log(productManager.getProducts());

  // Obtener producto por ID
  const productId = productManager.getProducts()[0].id;
  const productById = productManager.getProductById(productId);
  console.log(productById);

  // Actualizar producto
  productManager.updateProduct(productId, { price: 250, stock: 30 });
  console.log(productManager.getProducts());

  // Eliminar producto
  productManager.deleteProduct(productId);
  console.log(productManager.getProducts());
} catch (error) {
  console.error(error.message);
}
