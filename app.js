require('dotenv').config();
const express = require('express');
const { getCityInfo, getJobs } = require('./util'); 
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the application!');
});

app.get('/api/city/:city', async (req, res) => {
  try {
    const city = req.params.city; 

    const cityInfo = await getCityInfo(city);
    const jobs = await getJobs(city);

    
    if (!cityInfo && !jobs) {
      return res.status(404).json({
        error: 'Information not found for the city or jobs.'
      });
    }

    res.json({
      cityInfo,  
      jobs       
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
  
    res.status(500).json({ error: 'There was a server error.' });
  }
});

module.exports = app;
