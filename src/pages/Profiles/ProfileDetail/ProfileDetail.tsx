import { Box, Tab } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
import { ITab } from 'shared/interfaces/utils/ITab';
import { Tabs } from 'themes/elements';
import { useTabStyle } from 'themes/styles/useTabStyle';
import AudioTab from './AudioTab/AudioTab';
import CompositeTab from './CompositeTab/CompositeTab';
import ImageTab from './ImageTab/ImageTab';

import PrimaryImage from './PrimaryImage/PrimaryImage';
import { useStyles } from './ProfileDetail.styles';
import ResumeTab from './ResumeTab/ResumeTab';
import VideoTab from './VideoTab/VideoTab';

const tabs: ITab[] = [
  {
    name: 'primary_image',
    header: 'Primary Image',
    component: <PrimaryImage />,
    disabled: false,
  },
  {
    name: 'resume',
    header: 'Resume',
    component: <ResumeTab />,
    disabled: false,
  },
  {
    name: 'images',
    header: 'Images',
    component: <ImageTab />,
    disabled: false,
  },
  {
    name: 'videos',
    header: 'Video',
    component: <VideoTab />,
    disabled: false,
  },
  {
    name: 'audios',
    header: 'Audio',
    component: <AudioTab />,
    disabled: false,
  },
  {
    name: 'composite_card',
    header: 'Composite Card',
    component: <CompositeTab />,
    disabled: false,
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
    history.push(`${ROUTES.TALENT.PROFILE_DETAIL}/${newValue}`);
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
