const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
  );
  res.json(response.data);
});

app.get('/forecast/:city', async (req, res) => {
  const city = req.params.city;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
  );
  res.json(response.data);
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));


  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
