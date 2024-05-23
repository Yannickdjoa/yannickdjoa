import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AdminAbout from './adminDashElements/AdminAbout';
import AdminStacks from '../AdminStacks';
import AdminIntro from '../AdminIntro';
import DashboardText from './adminComponents/DashboardText';
import AdminExperiences from '../AdminExperiences';
import AdminProjects from '../AdminProjects';
import AdminTextCollection from '../AdminTextCollection';
import AdminPersonalData from '../AdminPersonalData';
import AdminServices from '../AdminServices';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}
function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
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
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
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
        role="navigation"
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
        <LinkTab
          label="Admin Stacks"
          href="/admindashboard/adminstacks"
          {...a11yProps(4)}
          sx={{
            color: 'white',
          }}
        />
        <LinkTab
          label="Admin Experience"
          href="/admindashboard/experiences"
          {...a11yProps(5)}
          sx={{
            color: 'white',
          }}
        />
        <LinkTab
          label="Admin Projects"
          href="/admindashboard/projects"
          {...a11yProps(6)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin Text Collection"
          {...a11yProps(7)}
          sx={{
            color: 'white',
          }}
        />
        <Tab
          label="Admin Personal Data"
          {...a11yProps(8)}
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
        <AdminServices />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AdminAbout />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AdminStacks />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AdminExperiences />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <AdminProjects />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <AdminTextCollection />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <AdminPersonalData />
      </TabPanel>
    </Box>
  );
}

export default AdminDashboard;
