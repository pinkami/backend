const fs = require('fs');

// Nombre del archivo JSON y carpeta
const fileName = 'productos.json';
const folderName = 'data';

// Ruta completa al archivo JSON
const filePath = `${folderName}/${fileName}`;

// Verificar si la carpeta existe, y crearla si es necesario
if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}

// Verificar si el archivo JSON existe, y crearlo si es necesario
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf8');
  console.log(`Archivo ${fileName} y carpeta ${folderName} creados exitosamente.`);
} else {
  console.log(`El archivo ${fileName} ya existe en la carpeta ${folderName}.`);
}
