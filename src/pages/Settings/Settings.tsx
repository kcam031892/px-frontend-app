import { Box, Tab } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { Route, Link, Switch, useRouteMatch, useParams, Redirect, useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
import { Tabs } from 'themes/elements';
import { useTabStyle } from 'themes/styles/useTabStyle';
import { useStyles } from './Settings.styles';

const AsyncMyAccount = React.lazy(() => import('./MyAccount/MyAccount'));
const AsyncStatistics = React.lazy(() => import('./Statistics/Statistics'));

const tabs = [
  {
    name: 'my_account',
    header: 'My Account',
    component: <AsyncMyAccount />,
    disabled: false,
  },
  {
    name: 'statistics',
    header: 'Statistics',
    component: <AsyncStatistics />,
    disabled: false,
  },
  {
    name: 'skills',
    header: 'Skills',
    component: <div>Skills</div>,
    disabled: false,
  },
  {
    name: 'social',
    header: 'Social',
    component: <div>Social</div>,
    disabled: false,
  },
  {
    name: 'integrations',
    header: 'Integrations',
    component: <div>Integrations</div>,
    disabled: false,
  },
  {
    name: 'plan',
    header: 'Plan',
    component: <div>Plan</div>,
    disabled: false,
  },
  {
    name: 'billing_invoices',
    header: 'Billing/Invoices',
    component: <div>Billing/Invoices</div>,
    disabled: false,
  },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>('myAccount');
  const { tab } = useParams() as { tab: string };
  const classes = useStyles();
  const tabStyle = useTabStyle();
  const getActiveTab = useMemo(() => {
    return tabs.find((_tab) => _tab.name === tab)?.component;
  }, [tab]);
  return (
    <Box>
      <Tabs value={tab}>
        {tabs.map((tab, index) => (
          <Tab
            className={tabStyle.root}
            key={index}
            label={tab.header}
            component={Link}
            disabled={tab.disabled}
            value={tab.name}
            to={`${ROUTES.APP.SETTINGS}/${tab.name}`}
          />
        ))}
      </Tabs>
      <Box className={classes.tabContainer}>{getActiveTab}</Box>
    </Box>
  );
};

export default Settings;
