import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MyTabs } from '../../components/nav';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import MyAccount from './myAccount';
import Skill from './skill';
import Stats from './stats';
import { useTabStyle } from '../../components/style';
import { Route, Link, Switch, useRouteMatch, useLocation, Redirect, useParams } from 'react-router-dom';
import Social from './social';

const tabs = [
  {
    name: 'myAccount',
    header: 'My Account',
    component: <MyAccount />,
    disabled: false,
  },
  {
    name: 'statistics',
    header: 'Statistics',
    component: <Stats />,
    disabled: false,
  },
  {
    name: 'skills',
    header: 'Skills',
    component: <Skill />,
    disabled: false,
  },
  {
    name: 'social',
    header: 'Social',
    component: <Social />,
    disabled: false,
  },
  {
    name: 'integrations',
    header: 'Integrations',
    component: <div>Integrations</div>,
    disabled: true,
  },
  {
    name: 'plan',
    header: 'Plan',
    component: <div>Plan</div>,
    disabled: true,
  },
  {
    name: 'billing',
    header: 'Billing/Invoices',
    component: <div>Billing/Invoices</div>,
    disabled: true,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabLabel: {
      '& span': {
        alignItems: 'flex-start',
        color: '#4A4A4A !important',
        textTransform: 'capitalize',
      },
    },
    tabPanel: {
      // padding: '0 144px',
      // marginTop: '16px'
    },
  }),
);

export default function Settings() {
  const tabStyle = useTabStyle();
  let defaultTabName = 'myAccount';
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const pathName = usePathname();
  tabs.forEach((x) => {
    if (pathName.indexOf(x.name) > 0) {
      defaultTabName = x.name;
    }
  });

  const [activeTab, setActiveTab] = React.useState(defaultTabName);
  const { path, url } = useRouteMatch();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setActiveTab(newValue);
  };
  return (
    <>
      <MyTabs value={activeTab} onChange={handleChange}>
        {tabs.map((x) => {
          return (
            <Tab
              label={x.header}
              key={x.name}
              disabled={x.disabled}
              component={Link}
              to={`${url}/${x.name}`}
              classes={tabStyle}
              value={x.name}
            />
          );
        })}
      </MyTabs>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/${defaultTabName}`} />
        </Route>
        <Route path={`${path}/:tabName`}>
          <TabItem onInit={(tabName: string) => setActiveTab(tabName)} />
        </Route>
      </Switch>
    </>
  );
}

interface TabItemProps {
  onInit: (tabName: string) => void;
}

function TabItem(props: TabItemProps) {
  const { tabName } = useParams() as { tabName: string };
  const classes = useStyles();
  return <Box className={classes.tabPanel}>{tabs.find((x) => x.name === tabName)?.component}</Box>;
}
