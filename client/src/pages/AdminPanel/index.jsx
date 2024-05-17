import react from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import React from 'react';
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import AdminStacks from './AdminStacks';
import AdminExperiences from './AdminExperiences';
import AdminProjects from './AdminProjects';
import AdminNewProjects from './AdminNewProjects';
import AdminTextCollection from './AdminTextCollection';
import AdminPersonalData from './AdminPersonalData';

function AdminPanel() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs forceRenderTabPanel defaultIndex={1}>
      <TabList>
        <Tab>Home</Tab>
        <Tab>About</Tab>
        <Tab>Portfolio</Tab>
        <Tab>Others</Tab>
      </TabList>
      <TabPanel>
        <Tabs forceRenderTabPanel>
          <TabList>
            <Tab>Intro</Tab>
            <Tab>Offers</Tab>
          </TabList>
          <TabPanel>
            <AdminIntro />
          </TabPanel>
          <TabPanel>
            <p>Our offers component goes here</p>
          </TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel>
        <Tabs forceRenderTabPanel>
          <TabList>
            <Tab>Personal info</Tab>
            <Tab>Stacks</Tab>
            <Tab>Experience</Tab>
          </TabList>
          <TabPanel>
            <AdminAbout />
          </TabPanel>
          <TabPanel>
            <AdminStacks />
          </TabPanel>
          <TabPanel>
            <AdminExperiences />
          </TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel>
        <Tabs forceRenderTabPanel>
          <TabList>
            <Tab>Expeience</Tab>
            <Tab>New Projects</Tab>
          </TabList>
          <TabPanel>
            <AdminProjects />
          </TabPanel>
          <TabPanel>
            <AdminNewProjects />
          </TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel>
        <Tabs forceRenderTabPanel>
          <TabList>
            <Tab>various texts</Tab>
            <Tab>personal data</Tab>
          </TabList>
          <TabPanel>
            <AdminTextCollection />
          </TabPanel>
          <TabPanel>
            <AdminPersonalData />
          </TabPanel>
        </Tabs>
      </TabPanel>
    </Tabs>
  );
}

export default AdminPanel;
