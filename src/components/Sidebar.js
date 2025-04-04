import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Switch
} from '@mui/material';
import {
  Dashboard,
  Map,
  LocationOn,
  Public,
  BarChart,
  Settings,
  Notifications,
  WbSunny,
  DarkMode
} from '@mui/icons-material';

function Sidebar({ onLocationSelect }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const tabs = [
    { id: 'dashboard', icon: Dashboard, label: 'Dashboard' },
    { id: 'map', icon: Map, label: 'Map View' },
    { id: 'locations', icon: LocationOn, label: 'Locations' },
    { id: 'globe', icon: Public, label: 'Global' },
    { id: 'statistics', icon: BarChart, label: 'Statistics' },
  ];

  const quickLocations = [
    { name: 'New York, US', temp: '18°C' },
    { name: 'London, UK', temp: '13°C' },
    { name: 'Tokyo, JP', temp: '22°C' },
    { name: 'Dubai, AE', temp: '33°C' },
  ];

  return (
    <Box width={256} bgcolor="grey.800" display="flex" flexDirection="column" height="100vh">
      <Box p={3} borderBottom={1} borderColor="grey.700">
        <Box display="flex" alignItems="center" gap={1.5}>
          <WbSunny sx={{ fontSize: 32, color: 'yellow' }} />
          <Typography variant="h6" color="white">Weather</Typography>
        </Box>
      </Box>

      <Box flex={1} p={2}>
        <Box>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              fullWidth
              startIcon={<tab.icon />}
              onClick={() => setActiveTab(tab.id)}
              sx={{
                justifyContent: 'flex-start',
                py: 1.5,
                px: 2,
                mb: 1,
                color: activeTab === tab.id ? 'white' : 'grey.400',
                bgcolor: activeTab === tab.id ? 'primary.main' : 'transparent',
                '&:hover': {
                  bgcolor: activeTab === tab.id ? 'primary.dark' : 'grey.700'
                }
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>

        <Box mt={4}>
          <Typography color="grey.400" variant="body2" px={2} mb={2}>
            Quick Access
          </Typography>
          {quickLocations.map((location) => (
            <Button
              key={location.name}
              fullWidth
              onClick={() => onLocationSelect?.(location.name.split(',')[0])}
              sx={{
                justifyContent: 'space-between',
                py: 1.5,
                px: 2,
                mb: 1,
                color: 'grey.400',
                '&:hover': { bgcolor: 'grey.700' }
              }}
            >
              <Typography>{location.name}</Typography>
              <Typography>{location.temp}</Typography>
            </Button>
          ))}
        </Box>
      </Box>

      <Box p={2} borderTop={1} borderColor="grey.700">
        <Box display="flex" justifyContent="space-between" mb={2}>
          <IconButton 
            size="small" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            sx={{ color: 'grey.400' }}
          >
            {isDarkMode ? <DarkMode /> : <WbSunny />}
          </IconButton>
          <IconButton size="small" sx={{ color: 'grey.400' }}>
            <Notifications />
          </IconButton>
          <IconButton size="small" sx={{ color: 'grey.400' }}>
            <Settings />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=faces"
            alt="Profile"
          />
          <Box>
            <Typography color="white" variant="body2">John Doe</Typography>
            <Typography color="grey.400" variant="caption">Premium User</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;