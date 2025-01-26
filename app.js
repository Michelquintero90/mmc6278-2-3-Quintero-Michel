require('dotenv').config();  // Cargar variables de entorno desde el archivo .env
const express = require('express');
const { getCityInfo, getJobs } = require('./util'); // Importa las funciones desde util.js
const app = express();

// Servir archivos estáticos desde la carpeta 'public' (ajusta el nombre si es diferente)
app.use(express.static('public'));

// Ruta GET para la raíz '/'
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación!');  // O bien puedes renderizar un archivo HTML si usas un motor de plantillas
});

// Ruta GET para obtener información sobre una ciudad y trabajos
app.get('/api/city/:city', async (req, res) => {
  try {
    const city = req.params.city;  // Obtén el nombre de la ciudad desde la URL

    // Llamamos a las funciones que obtienen los datos de la ciudad y los trabajos
    const cityInfo = await getCityInfo(city);
    const jobs = await getJobs(city);

    // Si no se encuentra la información de la ciudad o los trabajos, devuelve 404
    if (!cityInfo || !jobs) {
      return res.status(404).json({
        message: 'Información no encontrada para la ciudad o trabajos.'
      });
    }

    // Si encontramos la información, la devolvemos como JSON
    res.json({
      cityInfo,  // Información de la ciudad
      jobs       // Información de los trabajos
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ message: 'Hubo un error en el servidor.' });
  }
});

module.exports = app;  // Exporta la app para ser utilizada en otros archivos (si es necesario)
