import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AdminAbout from './AdminAbout';
import AdminStacks from '../AdminStacks';
import AdminIntro from '../AdminIntro';
import DashboardText from '../adminComponents/DashboardText';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: 1100, margin: 10 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
function AdminDashboard() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: '#393A47',
        display: 'flex',
        height: 1000,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Admin dashboard"
        sx={{
          marginTop: 10,
          borderRight: 1,
          borderColor: 'green',
        }}
      >
        <Tab
          label="Admin Dashboard"
          {...a11yProps(0)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin Web Intro"
          {...a11yProps(1)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin Services Offered"
          {...a11yProps(2)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin About Me"
          {...a11yProps(3)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin Stacks"
          {...a11yProps(4)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin Experience"
          {...a11yProps(5)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin Projects"
          {...a11yProps(6)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin New Projects "
          {...a11yProps(7)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin Text Collection"
          {...a11yProps(8)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin Personal Data"
          {...a11yProps(9)}
          sx={{
            color: 'white',
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DashboardText />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminIntro />
      </TabPanel>
      <TabPanel value={value} index={2}>
        services
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AdminAbout />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AdminStacks />
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={8}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={9}>
        Item Seven
      </TabPanel>
    </Box>
  );
}

export default AdminDashboard;
