import { Box } from '@mui/material';
import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

function WeatherChart({ type }) {
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: i,
    value: Math.random() * 10
  }));

  return (
    <Box height={80}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2196f3"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default WeatherChart;