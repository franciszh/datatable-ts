import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    )
}

interface TabComponentProps {
  tabConfigs: {label: string, tabItem: React.ReactNode}[]
}

export const TabComponent = (props: TabComponentProps) => {
    const { tabConfigs } = props;
    const [tabValue, setTabValue] = useState(1);
  
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
  
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label="tab navigation"
                >
                {
                  tabConfigs.map((config, index) => {
                    return ( <Tab key={config.label} value={index + 1} label={config.label} id={`simple-tab-${index + 1}`} /> )
                  })
                }
                </Tabs>
            </Box>
            {
              tabConfigs.map((config, index) => {
                return ( <TabPanel key={config.label} index={index + 1} value={tabValue} children={config.tabItem} /> )
              })
            }
        </Box>
    );
  }