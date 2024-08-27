//const express = require('express'); 
//const cors = require('cors'); 
//const axios = require('axios'); 
 
//const app = express(); 
//const port = process.env.PORT || 4000; 
 
//const corsOptions = {  
  //origin: 'https://shiny-kleicha-871163.netlify.app', // Update with your Netlify URL   
  //origin: 'https://localhost:3000', // Update with your Netlify URL   
  //methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],  
  //allowedHeaders: ['Content-Type']  
//};  

//// Allow requests from specific origin
////app.use(cors({ origin: 'https://shiny-kleicha-871163.netlify.app' }));  // Replace with your frontend origin

////app.get('/', (req, res) => {
  //res.send('CORS enabled!');
////});

////app.listen(3000, () => {
  //console.log('Server running on https://shiny-kleicha-871163.netlify.app');
////});

//app.use(cors(corsOptions));  
//app.use(express.json()); // Middleware to parse JSON bodies 
 
//app.get('/api/ipqualityscore/:ip', async (req, res) => {  
  //try {  
    //const ip = req.params.ip;  
    //const apiKey = 'jCXGMOuvErBqPFEjz49MLSnhZvnsIQCR'; // Replace with your IPQualityScore API key  
    //const url = 'https://www.ipqualityscore.com/api/json/ip/${apiKey}/${ip}?strictness=0&allow_public_access_points=true&fast=true&lighter_penalties=true&mobile=true';  
    //const url = `https://www.ipqualityscore.com/api/json/ip/${apiKey}/${ip}?strictness=0&allow_public_access_points=true&fast=true&lighter_penalties=true&mobile=true`;

    //const response = await axios.get(url);  
 
    //console.log(`IPQualityScore API response for IP ${ip}:`, response.data); // Log the API response 
    //res.json(response.data);  
  //} //catch (error) {  
    //console.error(`Error fetching data from IPQualityScore for IP ${ip}:`, error.message); // Log the error message 
    //res.status(500).json({ error: 'Error fetching data from IPQualityScore' });  
  //}  
//});  
 
//app.post('/api/log', (req, res) => { 
  //try { 
    //const { message } = req.body; 
    //if (!message) { 
      //throw new Error('Message is missing in request body'); 
    //} 
    //console.log(message); 
    //res.status(200).send('Log received'); 
  //} catch (error) { 
   // console.error(`Error in /api/log: ${error.message}`); 
    //res.status(400).json({ error: error.message }); 
  //} 
//}); 
 
//app.listen(port, '0.0.0.0', () => { 
  //console.log(`Server running at http://0.0.0.0:${port}`); 
//});

const express = require('express'); 
const cors = require('cors'); 
const axios = require('axios'); 
 
const app = express(); 
const port = process.env.PORT || 4000; 
 
const corsOptions = {  
  origin: 'https://shiny-kleicha-871163.netlify.app', // Your Netlify URL   
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],  
  allowedHeaders: ['Content-Type']  
};  

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
 
app.post('/api/log', (req, res) => { 
  try { 
    const { message } = req.body; 
    if (!message) { 
      throw new Error('Message is missing in request body'); 
    } 
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