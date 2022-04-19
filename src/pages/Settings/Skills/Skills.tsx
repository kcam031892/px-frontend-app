import React, { useMemo, useState } from 'react';
import { useStyles } from './Skills.styles';
import { Route, Link, Switch, useRouteMatch, useParams, Redirect, useLocation } from 'react-router-dom';
import { Tabs, Box, Tab, Grid, Card, CardContent, Typography, Input, FormControl, InputLabel } from '@material-ui/core';
import { useCardContentStyle } from 'themes/styles/useCardContentStyle';
import Accents from './Accents/Accents';
import Languages from './Languages/Languages';
import Instrumental from './Instrumental/Instrumental';
import Dance from './Dance/Dance';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
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
        <Grid container spacing={0}>
          {children}
        </Grid>
      )}
    </div>
  );
}

const tabs = [
  {
    name: 'accents',
    header: 'Accents',
    component: <Accents />,
    disabled: false,
  },
  {
    name: 'languages',
    header: 'Languages',
    component: <Languages />,
    disabled: false,
  },
  {
    name: 'instrumental',
    header: 'Instrumental',
    component: <Instrumental />,
    disabled: false,
  },
  {
    name: 'dance',
    header: 'Dance',
    component: <Dance />,
    disabled: false,
  },
  {
    name: 'vocal',
    header: 'Vocal',
    component: <div>Vocal</div>,
    disabled: false,
  },
  {
    name: 'circus',
    header: 'Circus',
    component: <div>Circus</div>,
    disabled: false,
  },
  {
    name: 'sports',
    header: 'Sports',
    component: <div>Sports</div>,
    disabled: false,
  },
  {
    name: 'performanceSkills',
    header: 'Performance Skills',
    component: <div>Performance Skills</div>,
    disabled: false,
  },
];

const Skills = () => {
  const classes = useStyles();
  const { tab } = useParams() as { tab: string };
  const [value, setValue] = React.useState<string>('accents');
  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={0}>
      <Grid container spacing={2}>
        <Grid xs={12} md={3} item>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            orientation="vertical"
          >
            {tabs.map((tab, index) => (
              <Tab
                className={classes.tabItems}
                key={index}
                label={tab.header}
                disabled={tab.disabled}
                value={tab.name}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid xs={12} md={9} item>
          {tabs.map((tab, index) => (
            <TabPanel value={value} index={tab.name}>
              {tab.component}
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Skills;
