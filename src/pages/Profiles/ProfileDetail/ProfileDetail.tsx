import { Box, Tab } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
import { ITab } from 'shared/interfaces/utils/ITab';
import { profileService } from 'shared/services/profileService';
import { isShowCompositeCard } from 'shared/utils/isShowCompositeCard';
import { Backdrop, Tabs } from 'themes/elements';
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

const { getSingleProfile } = profileService();
const ProfileDetail = () => {
  const { tab, profileId } = useParams() as { tab: string; profileId: string };
  const history = useHistory();

  const { data, isError, isLoading } = getSingleProfile(profileId);

  const classes = useStyles();
  const tabStyle = useTabStyle();

  useEffect(() => {
    if (isError) {
      history.push(`${ROUTES.TALENT.PROFILE}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, history]);

  useEffect(() => {
    if (!profileId) {
      history.push(`${ROUTES.TALENT.PROFILE}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId, history]);

  const getActiveTab = useMemo(() => {
    return tabs.find((_tab) => _tab.name === tab)?.component;
  }, [tab]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    if (tab !== newValue) {
      history.push(`${ROUTES.TALENT.PROFILE_DETAIL}/${profileId}/${newValue}`);
    }
  };
  return (
    <Box>
      {data && (
        <>
          <Tabs value={tab} onChange={handleTabChange}>
            {tabs.map((tab, index) =>
              tab.name === 'composite_card' ? (
                <Tab
                  key={index}
                  label={tab.header}
                  disabled={tab.disabled || !isShowCompositeCard(data.data.attributes.profile_type)}
                  value={tab.name}
                  classes={tabStyle}
                />
              ) : (
                <Tab key={index} label={tab.header} disabled={tab.disabled} value={tab.name} classes={tabStyle} />
              ),
            )}
          </Tabs>
          <Box className={classes.tabContainer}>{getActiveTab}</Box>
        </>
      )}
      <Backdrop isLoading={isLoading} />
    </Box>
  );
};

export default ProfileDetail;
