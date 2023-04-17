import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const getWeather = async () => {
    const response = await axios.get(`http://localhost:5000/weather/${city}`);
    setWeatherData(response.data);
  };

  const getForecast = async () => {
    const response = await axios.get(`http://localhost:5000/forecast/${city}`);
    setForecastData(response.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
    getForecast();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Weather Forecast</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Get Weather
            </Button>
          </Form>
          {weatherData && (
            <div className="weather-info">
              <h3>
                {weatherData.name}, {weatherData.sys.country}
              </h3>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
          )}
          {forecastData && (
            <div className="forecast-info">
              <h3>5-Day Forecast</h3>
              <Row>
                {forecastData.list
                  .filter((_, i) => i % 8 === 0)
                  .map((item, index) => (
                    <Col key={index}>
                      <p>
                        {format(new Date(item.dt * 1000), 'EEEE, MMM d')}
                      </p>
                      <p>Temperature: {item.main.temp}°C</p>
                      <p>Weather: {item.weather[0].description}</p>
                    </Col>
                  ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
