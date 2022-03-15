import { Box, Tab } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { Route, Link, Switch, useRouteMatch, useParams, Redirect, useLocation, useHistory } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
import { ITab } from 'shared/interfaces/utils/ITab';
import { Tabs } from 'themes/elements';
import { useTabStyle } from 'themes/styles/useTabStyle';
import Biography from './Biography/Biography';
import PrimaryImage from './PrimaryImage/PrimaryImage';
import { useStyles } from './ProfileDetail.styles';
import Resume from './Resume/Resume';

const tabs: ITab[] = [
  {
    name: 'primary_image',
    header: 'Primary Image',
    component: <PrimaryImage />,
    disabled: false,
  },
  {
    name: 'biography',
    header: 'Biography',
    component: <Biography />,
    disabled: false,
  },
  {
    name: 'resume',
    header: 'Resume',
    component: <Resume />,
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
  const { tab } = useParams() as { tab: string };
  const history = useHistory();

  const classes = useStyles();
  const tabStyle = useTabStyle();
  const getActiveTab = useMemo(() => {
    return tabs.find((_tab) => _tab.name === tab)?.component;
  }, [tab]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push(`${ROUTES.APP.PROFILE_DETAIL}/${newValue}`);
  };
  return (
    <Box>
      <Tabs value={tab} onChange={handleTabChange}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.header} disabled={tab.disabled} value={tab.name} classes={tabStyle} />
        ))}
      </Tabs>
      <Box className={classes.tabContainer}>{getActiveTab}</Box>
    </Box>
  );
};

export default ProfileDetail;