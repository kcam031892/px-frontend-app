import { Box, Tab } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { Route, Link, Switch, useRouteMatch, useParams, Redirect, useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
import { Tabs } from 'themes/elements';
import { useTabStyle } from 'themes/styles/useTabStyle';
import { useStyles } from './ProfileDetail.styles';

const AsyncPrimaryImage = React.lazy(() => import('./PrimaryImage/PrimaryImage'));
const AsyncBiography = React.lazy(() => import('./Biography/Biography'));
const AsyncResume = React.lazy(() => import('./Resume/Resume'));

const tabs = [
  {
    name: 'primary_image',
    header: 'Primary Image',
    component: <AsyncPrimaryImage />,
    disabled: false,
  },
  {
    name: 'biography',
    header: 'Biography',
    component: <AsyncBiography />,
    disabled: false,
  },
  {
    name: 'resume',
    header: 'Resume',
    component: <AsyncResume />,
    disabled: false,
  },
  {
    name: 'images',
    header: 'Images',
    component: <div>HEllo</div>,
    disabled: true,
  },
  {
    name: 'videos',
    header: 'Video',
    component: <div>Videos</div>,
    disabled: true,
  },
  {
    name: 'audios',
    header: 'Audio',
    component: <div>Audios</div>,
    disabled: true,
  },
  {
    name: 'composite_card',
    header: 'Composite Card',
    component: <div>Composite Card</div>,
    disabled: true,
  },
];

const ProfileDetail = () => {
  const [activeTab, setActiveTab] = useState<string>('primaryImage');
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
            key={index}
            label={tab.header}
            component={Link}
            disabled={tab.disabled}
            value={tab.name}
            to={`${ROUTES.APP.PROFILE_DETAIL}/${tab.name}`}
          />
        ))}
      </Tabs>
      <Box className={classes.tabContainer}>{getActiveTab}</Box>
    </Box>
  );
};

export default ProfileDetail;
