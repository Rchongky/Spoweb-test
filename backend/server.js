const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'https://sashazhang-resume.netlify.app', // Your Netlify URL  
  //origin: 'https://localhost:3000', //localhost, update with Netlify URL
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
const logFilePath = path.join(__dirname, 'logs.csv');

const csvWriter = createCsvWriter({
  path: logFilePath,
  header: [
    { id: 'timestamp', title: 'Timestamp' },
    { id: 'message', title: 'Message' }
  ],
  append: true, // Append to the CSV if it exists, instead of overwriting it
});

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/ipqualityscore/:ip', async (req, res) => {
  try {
    const ip = req.params.ip;
    const apiKey = 'jCXGMOuvErBqPFEjz49MLSnhZvnsIQCR';
    const url = `https://www.ipqualityscore.com/api/json/ip/${apiKey}/${ip}?strictness=0&allow_public_access_points=true&fast=true&lighter_penalties=true&mobile=true`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data from IPQualityScore for IP ${ip}:`, error.message);
    res.status(500).json({ error: 'Error fetching data from IPQualityScore' });
  }
});

app.post('/api/log', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      throw new Error('Message is missing in request body');
    }

    const logFilePath = path.join(__dirname, 'logs.csv');

    // Log the file path
    console.log('Log file path:', logFilePath);

    // Check if the file exists
    if (fs.existsSync(logFilePath)) {
      console.log('Log file exists.');
    } else {
      console.log('Log file does not exist.');
    }
    // Log entry with timestamp
    const logEntry = {
      timestamp: new Date().toISOString(),
      message
    };

    // Write to CSV file
    await csvWriter.writeRecords([logEntry]);

    console.log(message);

    res.status(200).send('Log received');
  } catch (error) {
    console.error(`Error in /api/log: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
