// import React, { useState } from 'react';
// import {
//   Container,
//   Box,
//   TextField,
//   Typography,
//   Card,
//   Grid,
//   IconButton,
//   Paper,
//   MenuItem,
//   Select,
//   Avatar
// } from '@mui/material';
// import {
//   Search,
//   WbTwilight,
//   WaterDrop,
//   Visibility,
//   LocationOn,
//   AccessTime,
//   Speed
// } from '@mui/icons-material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { motion } from 'framer-motion';
// import { LineChart, Line, ResponsiveContainer } from 'recharts';
// import { 
//   Dashboard, Map, Language, Settings, Person,
//   Add, Remove, Layers
// } from '@mui/icons-material';
// import GoogleMapReact from 'google-map-react';


// const API_KEY = '69b0991e4229bbc66c5e10a0eb74c454'; // Replace with your actual OpenWeather API key

// // Dummy WeatherIcon component
// const WeatherIcon = ({ type }) => (
//   <Typography variant="body2" sx={{ color: '#00a0ff' }}>{type}</Typography>
// );

// // Custom dark theme
// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });


// // Add this after theme creation
// const SideNav = () => (
//   <Box sx={{
//     position: 'fixed',
//     left: 0,
//     top: 0,
//     bottom: 0,
//     width: '60px',
//     background: 'rgba(25,25,25,0.9)',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     py: 2,
//     gap: 3
//   }}>
//     <Typography variant="h6" sx={{ color: '#00a0ff', mb: 2 }}>
//       Weathy
//     </Typography>
//     <IconButton><Dashboard /></IconButton>
//     <IconButton><Map /></IconButton>
//     <IconButton><Language /></IconButton>
//     <IconButton><Settings /></IconButton>
//     <Box sx={{ mt: 'auto' }}>
//       <IconButton>
//         <Avatar sx={{ width: 30, height: 30 }}>
//           <Person />
//         </Avatar>
//       </IconButton>
//     </Box>
//   </Box>
// );

// // Add this new component for the weather map
// const WeatherMap = () => (
//   <Box sx={{ height: '300px', position: 'relative' }}>
//     <GoogleMapReact
//       bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_KEY' }}
//       defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
//       defaultZoom={4}
//       options={{
//         styles: [{ stylers: [{ invert_lightness: true }] }],
//         fullscreenControl: false,
//       }}
//     >
//     </GoogleMapReact>
//     <Box sx={{
//       position: 'absolute',
//       top: 10,
//       right: 10,
//       display: 'flex',
//       flexDirection: 'column',
//       gap: 1
//     }}>
//       <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}><Add /></IconButton>
//       <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}><Remove /></IconButton>
//       <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}><Layers /></IconButton>
//     </Box>
//   </Box>
// );

// function App() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState('');
//   const [forecast, setForecast] = useState([]);

//   const fetchWeather = async () => {
//     if (!city) return;
//     try {
//       const [weatherRes, forecastRes] = await Promise.all([
//         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`),
//         fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
//       ]);

//       const weatherData = await weatherRes.json();
//       const forecastData = await forecastRes.json();

//       if (weatherData.cod === 200) {
//         setWeather(weatherData);
//         setForecast(forecastData.list.slice(0, 7));
//         setError('');
//       } else {
//         setError('City not found');
//         setWeather(null);
//       }
//     } catch (err) {
//       setError('Failed to fetch weather data');
//       setWeather(null);
//     }
//   };

//   // Modify the main return statement to include the side navigation
//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           minHeight: '100vh',
//           background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
//           py: 4
//         }}
//       >
//         <Container maxWidth="lg">
//           <motion.div
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* Search Section */}
//             <Paper
//               elevation={6}
//               sx={{
//                 p: 2,
//                 mb: 4,
//                 background: 'rgba(45, 45, 45, 0.7)',
//                 backdropFilter: 'blur(10px)'
//               }}
//             >
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <TextField
//                   fullWidth
//                   label="Enter city name"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       '&:hover fieldset': {
//                         borderColor: '#00a0ff',
//                       },
//                     }
//                   }}
//                 />
//                 <IconButton
//                   onClick={fetchWeather}
//                   sx={{
//                     background: '#00a0ff',
//                     '&:hover': { background: '#0081cc' }
//                   }}
//                 >
//                   <Search />
//                 </IconButton>
//               </Box>
//               {error && (
//                 <Typography color="error" sx={{ mt: 1 }}>
//                   {error}
//                 </Typography>
//               )}
//             </Paper>

//             {/* Weather Content */}
//             {weather && (
//               <Grid container spacing={3}>
//                 {/* Main Weather Info */}
//                 <Grid item xs={12}>
//                   <Card sx={{
//                     background: 'rgba(25,25,25,0.8)',
//                     backdropFilter: 'blur(10px)',
//                     p: 3
//                   }}>
//                     <Grid container spacing={2}>
//                       <Grid item xs={12} md={6}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                           <WeatherIcon type={weather.weather[0].main} />
//                           <Typography variant="h2">
//                             {Math.round(weather.main.temp)}°C
//                           </Typography>
//                         </Box>
//                         <Typography sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <LocationOn fontSize="small" />
//                           {weather.name}, {weather.sys.country}
//                         </Typography>
//                         <Typography sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <AccessTime fontSize="small" />
//                           {new Date().toLocaleString()}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </Card>
//                 </Grid>

//                 {/* Highlight Section */}
//                 <Grid item xs={12}>
//                   <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>Today's Highlight</Typography>
//                   <Grid container spacing={2}>
//                     {/* Wind Status */}
//                     <Grid item xs={12} sm={4}>
//                       <Card sx={{ background: 'rgba(25,25,25,0.8)', p: 2 }}>
//                         <Typography variant="subtitle1">Wind Status</Typography>
//                         <Box sx={{ height: 100 }}>
//                           <ResponsiveContainer width="100%" height="100%">
//                             <LineChart data={forecast}>
//                               <Line type="monotone" dataKey="wind.speed" stroke="#00a0ff" />
//                             </LineChart>
//                           </ResponsiveContainer>
//                         </Box>
//                         <Typography variant="h4">{weather.wind.speed}</Typography>
//                         <Typography variant="body2">m/s</Typography>
//                       </Card>
//                     </Grid>

//                     {/* UV Index */}
//                     <Grid item xs={12} sm={4}>
//                       <Card sx={{ background: 'rgba(25,25,25,0.8)', p: 2 }}>
//                         <Typography variant="subtitle1">UV Index</Typography>
//                         <Box sx={{
//                           height: 120,
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}>
//                           <Typography variant="h3">5.50</Typography>
//                         </Box>
//                       </Card>
//                     </Grid>

//                     {/* Sunrise & Sunset */}
//                     <Grid item xs={12} sm={4}>
//                       <Card sx={{ background: 'rgba(25,25,25,0.8)', p: 2 }}>
//                         <Typography variant="subtitle1">Sunrise & Sunset</Typography>
//                         <Box sx={{ mt: 2 }}>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                             <WbTwilight />
//                             <Typography>
//                               {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
//                             </Typography>
//                           </Box>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <WbTwilight />
//                             <Typography>
//                               {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Card>
//                     </Grid>

//                     {/* Additional Stats */}
//                     <Grid item xs={12} sm={4}>
//                       <Card sx={{ background: 'rgba(25,25,25,0.8)', p: 2 }}>
//                         <Typography variant="subtitle1">Humidity</Typography>
//                         <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <WaterDrop />
//                           <Typography variant="h4">{weather.main.humidity}%</Typography>
//                         </Box>
//                       </Card>
//                     </Grid>

//                     <Grid item xs={12} sm={4}>
//                       <Card sx={{ background: 'rgba(25,25,25,0.8)', p: 2 }}>
//                         <Typography variant="subtitle1">Visibility</Typography>
//                         <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Visibility />
//                           <Typography variant="h4">
//                             {(weather.visibility / 1000).toFixed(1)} km
//                           </Typography>
//                         </Box>
//                       </Card>
//                     </Grid>

//                     <Grid item xs={12} sm={4}>
//                       <Card sx={{ background: 'rgba(25,25,25,0.8)', p: 2 }}>
//                         <Typography variant="subtitle1">Feels Like</Typography>
//                         <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Speed />
//                           <Typography variant="h4">
//                             {Math.round(weather.main.feels_like)}°
//                           </Typography>
//                         </Box>
//                       </Card>
//                     </Grid>
//                   </Grid>
//                 </Grid>

//                 {/* 7 Days Forecast */}
//                 <Grid item xs={12}>
//                   <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>7 Days Forecast</Typography>
//                   <Card sx={{ background: 'rgba(25,25,25,0.8)', p: 2 }}>
//                     <Grid container spacing={2}>
//                       {forecast.map((day, index) => (
//                         <Grid item xs={12} sm={3} key={index}>
//                           <Box sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             p: 1
//                           }}>
//                             <Box>
//                               <Typography>{new Date(day.dt * 1000).toLocaleDateString()}</Typography>
//                               <Typography variant="h6">
//                                 {Math.round(day.main.temp)}°C
//                               </Typography>
//                             </Box>
//                             <WeatherIcon type={day.weather[0].main} />
//                           </Box>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Card>
//                 </Grid>
//               </Grid>
//             )}
//           </motion.div>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default App;

// // Update the weather cards grid layout
// <Grid container spacing={2}>
//   <Grid item xs={12} md={4}>
//     {/* Main weather card */}
//     <Card sx={{
//       background: 'rgba(25,25,25,0.8)',
//       height: '100%',
//       p: 3
//     }}>
//       {/* Your existing weather content */}
//     </Card>
//   </Grid>
  
//   <Grid item xs={12} md={8}>
//     <Grid container spacing={2}>
//       {/* Your existing highlight cards */}
//     </Grid>
//   </Grid>

//   <Grid item xs={12}>
//     <Box sx={{ mt: 4 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <Typography variant="h6">Weather condition map</Typography>
//         <Select
//           value="24hr"
//           size="small"
//           sx={{ minWidth: 100 }}
//         >
//           <MenuItem value="24hr">24 hr</MenuItem>
//         </Select>
//       </Box>
//       <WeatherMap />
//     </Box>
//   </Grid>
// </Grid>












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