import { Box, Tab } from '@material-ui/core';
import React, { useState } from 'react';
import { Route, Link, Switch, useRouteMatch, useParams, Redirect, useLocation } from 'react-router-dom';
import { Tabs } from 'themes/elements';
import { useTabStyle } from 'themes/styles/useTabStyle';

const tabs = [
  {
    name: 'primaryImage',
    header: 'Primary Image',
    component: <div>HEllo</div>,
    disabled: false,
  },
  {
    name: 'biography',
    header: 'Biography',
    component: <div>HEllo</div>,
    disabled: false,
  },
  {
    name: 'resume',
    header: 'Resume',
    component: <div>HEllo</div>,
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
    name: 'compositeCard',
    header: 'Composite Card',
    component: <div>Composite Card</div>,
    disabled: true,
  },
];

const ProfileDetail = () => {
  const [activeTab, setActiveTab] = useState<string>('primaryImage');
  const tabStyle = useTabStyle();
  return (
    <Box>
      <Tabs value={activeTab}>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            label={tab.header}
            component={Link}
            disabled={tab.disabled}
            value={tab.name}
            to={`/${tab.name}`}
            classes={tabStyle}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProfileDetail;
