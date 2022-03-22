import { Box, Tab } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';
import { ITab } from 'shared/interfaces/utils/ITab';
import { Tabs } from 'themes/elements';
import { useTabStyle } from 'themes/styles/useTabStyle';
import AudioTab from './AudioTab/AudioTab';
import Dashboard from './Dashboard/Dashboard';
import ImagesTab from './ImagesTab/ImagesTab';
import { useStyles } from './Media.styles';
import Upload from './Upload/Upload';
import VideoTab from './VideoTab/VideoTab';

const tabs: ITab[] = [
  {
    name: 'dashboard',
    header: 'Dashboard',
    component: <Dashboard />,
    disabled: false,
  },
  {
    name: 'images',
    header: 'Images',
    component: <ImagesTab />,
    disabled: false,
  },
  {
    name: 'videos',
    header: 'Videos',
    component: <VideoTab />,
    disabled: false,
  },
  {
    name: 'audios',
    header: 'Audios',
    component: <AudioTab />,
    disabled: false,
  },
  {
    name: 'documents',
    header: 'Documents',
    component: <div>Documents</div>,
    disabled: true,
  },
  {
    name: 'upload',
    header: 'Upload',
    component: <Upload />,
    disabled: false,
  },
];

const Media = () => {
  const classes = useStyles();
  const tabStyle = useTabStyle();
  const { tab } = useParams() as { tab: string };
  const history = useHistory();
  const getActiveTab = useMemo(() => {
    return tabs.find((_tab) => _tab.name === tab)?.component;
  }, [tab]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push(`${ROUTES.APP.MEDIA}/${newValue}`);
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

export default Media;
