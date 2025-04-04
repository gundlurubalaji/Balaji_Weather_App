import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Add, Remove, Layers } from '@mui/icons-material';

function WeatherMap({ city }) {
  return (
    <Box 
      position="relative" 
      height={400} 
      bgcolor="grey.700" 
      borderRadius={2} 
      overflow="hidden"
    >
      <iframe
        title="Weather Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=0&lon=0&zoom=3`}
        style={{ position: 'absolute', inset: 0 }}
      />
      
      <Box 
        position="absolute" 
        right={16} 
        top={16} 
        display="flex" 
        flexDirection="column" 
        gap={1}
      >
        <IconButton size="small" sx={{ bgcolor: 'grey.800', '&:hover': { bgcolor: 'grey.600' } }}>
          <Add />
        </IconButton>
        <IconButton size="small" sx={{ bgcolor: 'grey.800', '&:hover': { bgcolor: 'grey.600' } }}>
          <Remove />
        </IconButton>
        <IconButton size="small" sx={{ bgcolor: 'grey.800', '&:hover': { bgcolor: 'grey.600' } }}>
          <Layers />
        </IconButton>
      </Box>
    </Box>
  );
}

export default WeatherMap;