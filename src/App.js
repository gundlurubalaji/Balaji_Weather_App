


import React, { useState, useEffect } from 'react';
import { format, fromUnixTime } from 'date-fns';
import { 
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Button
} from '@mui/material';
import {
  Search,
  Air,
  WbSunny,
  WaterDrop,
  Visibility,
  DeviceThermostat,
  LocationOn
} from '@mui/icons-material';
import WeatherChart from './components/WeatherChart';
import WeatherMap from './components/WeatherMap';
import WeatherMetric from './components/WeatherMetric';
import Sidebar from './components/Sidebar';
import { getWeatherByCity, getForecastByCity } from './services/weatherApi';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [city, setCity] = useState('London');
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError('');
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getForecastByCity(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      setSearchInput('');
    }
  };

  const handleLocationSelect = (location) => {
    setCity(location);
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          bgcolor: 'grey.900',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          bgcolor: 'grey.900',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box textAlign="center">
          <Typography color="error" mb={2}>{error}</Typography>
          <Button 
            variant="contained" 
            onClick={fetchWeatherData}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.900', display: 'flex' }}>
      <Sidebar onLocationSelect={handleLocationSelect} />

      <Box flex={1} p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" color="white">Today's Highlight</Typography>
          <Box component="form" onSubmit={handleSearch}>
            <TextField
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search location..."
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'grey.700',
                  },
                  '&:hover fieldset': {
                    borderColor: 'grey.500',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <IconButton size="small" sx={{ color: 'grey.500' }}>
                    <Search />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>

        {weather && (
          <>
            <Paper sx={{ bgcolor: 'grey.800', p: 3, mb: 4, borderRadius: 4 }}>
              <Box display="flex" alignItems="center" gap={4}>
                <Typography variant="h1" color="white">
                  {Math.round(weather.main.temp)}°C
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box>
                    <img 
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt={weather.weather[0].description}
                      style={{ width: '96px', height: '96px' }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" color="white" sx={{ textTransform: 'capitalize' }}>
                      {weather.weather[0].description}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1} color="grey.400">
                      <LocationOn fontSize="small" />
                      <Typography>
                        {weather.name}, {weather.sys.country}
                      </Typography>
                    </Box>
                    <Typography color="grey.400" mt={1}>
                      {format(currentTime, 'dd MMMM yyyy h:mm a')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Grid container spacing={3} mb={4}>
              <Grid item xs={4}>
                <WeatherMetric
                  title="Wind Status"
                  value={weather.wind.speed}
                  unit="m/s"
                  icon={<Air />}
                  chart={<WeatherChart type="wind" />}
                />
              </Grid>
              <Grid item xs={4}>
                <WeatherMetric
                  title="UV Index"
                  value={5.50}
                  unit="UV"
                  icon={<WbSunny />}
                  chart={<WeatherChart type="uv" />}
                />
              </Grid>
              <Grid item xs={4}>
                <WeatherMetric
                  title="Sunrise & Sunset"
                  customContent={
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                      <Box textAlign="center">
                        <WbSunny sx={{ fontSize: 32, color: 'yellow' }} />
                        <Typography mt={1}>
                          {format(fromUnixTime(weather.sys.sunrise), 'h:mm a')}
                        </Typography>
                      </Box>
                      <Box textAlign="center">
                        <WbSunny sx={{ fontSize: 32, color: 'orange' }} />
                        <Typography mt={1}>
                          {format(fromUnixTime(weather.sys.sunset), 'h:mm a')}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <WeatherMetric
                  title="Humidity"
                  value={weather.main.humidity}
                  unit="%"
                  icon={<WaterDrop />}
                />
              </Grid>
              <Grid item xs={4}>
                <WeatherMetric
                  title="Visibility"
                  value={weather.visibility / 1000}
                  unit="km"
                  icon={<Visibility />}
                />
              </Grid>
              <Grid item xs={4}>
                <WeatherMetric
                  title="Feels Like"
                  value={Math.round(weather.main.feels_like)}
                  unit="°"
                  icon={<DeviceThermostat />}
                />
              </Grid>
            </Grid>

            {forecast && (
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Paper sx={{ bgcolor: 'grey.800', p: 3, borderRadius: 4 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                      <Typography variant="h6" color="white">5 days Forecast</Typography>
                    </Box>
                    <Box>
                      {forecast.list
                        .filter((_, index) => index % 8 === 0)
                        .slice(0, 5)
                        .map((day) => (
                          <Box 
                            key={day.dt} 
                            display="flex" 
                            justifyContent="space-between" 
                            alignItems="center"
                            mb={2}
                          >
                            <Box display="flex" alignItems="center" gap={2}>
                              <img 
                                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                                alt={day.weather[0].description}
                                style={{ width: '32px', height: '32px' }}
                              />
                              <Box>
                                <Typography color="white">
                                  +{Math.round(day.main.temp_max)}°/
                                  +{Math.round(day.main.temp_min)}°
                                </Typography>
                                <Typography variant="body2" color="grey.400">
                                  {format(fromUnixTime(day.dt), 'dd MMM')}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography color="grey.400">
                              {format(fromUnixTime(day.dt), 'EEEE')}
                            </Typography>
                          </Box>
                        ))}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ bgcolor: 'grey.800', p: 3, borderRadius: 4 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                      <Typography variant="h6" color="white">Weather condition map</Typography>
                    </Box>
                    <WeatherMap city={city} />
                  </Paper>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;