const http = require('http');
const fs = require('fs');
const util = require('util'); // Permite convertir objetos complejos a texto

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Convierte el objeto req a texto legible incluyendo referencias internas
    const requestInfo = util.inspect(req, { showHidden: true, depth: null });

    // Guarda la información en un archivo
    fs.writeFile('log.txt', requestInfo, (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
        } else {
            console.log('Información guardada en log.txt');
        }
    });

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Petición registrada y guardada en log.txt\n');
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
