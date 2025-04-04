import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

function WeatherMetric({ title, value, unit, icon, chart, customContent }) {
  return (
    <Paper sx={{ bgcolor: 'grey.800', p: 3, borderRadius: 4, height: '100%' }}>
      <Box display="flex" alignItems="center" gap={1} color="grey.400" mb={2}>
        {icon}
        <Typography>{title}</Typography>
      </Box>
      
      {customContent || (
        <>
          <Typography variant="h4" color="white" mb={2}>
            {value}
            <Typography component="span" variant="h6" ml={0.5}>{unit}</Typography>
          </Typography>
          {chart}
        </>
      )}
    </Paper>
  );
}

export default WeatherMetric;