import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
import { DetailWrapper, TabContainer, Tabs } from './ProfileDetail.styled';

const AsyncPrimaryImage = React.lazy(() => import('./PrimaryImage/PrimaryImage'));
const AsyncBiography = React.lazy(() => import('./Biography/Biography'));
const AsyncResume = React.lazy(() => import('./Resume/Resume'));
const { TabPane } = Tabs;
const ProfileDetail = () => {
  const { push } = useHistory();
  const { tab } = useParams() as any;

  const tabs = [
    {
      title: 'Primary Image',
      Content: <AsyncPrimaryImage />,
      disabled: false,
    },
    {
      title: 'Biography',
      Content: <AsyncBiography />,
      disabled: false,
    },
    {
      title: 'Resume',
      Content: <AsyncResume />,
      disabled: false,
    },
    {
      title: 'Image',
      Content: <h1>Hello</h1>,
      disabled: true,
    },
    {
      title: 'Video',
      Content: <h1>Hello</h1>,
      disabled: true,
    },
    {
      title: 'Audio',
      Content: <h1>Hello</h1>,
      disabled: true,
    },
    {
      title: 'Composite Card',
      Content: <h1>Hello</h1>,
      disabled: true,
    },
  ];

  const handleTabChange = (key: string) => {
    push(`${ROUTES.PROFILE_DETAIL}/${key}`);
  };

  return (
    <DetailWrapper>
      <Tabs defaultActiveKey={tab ? tab : 0} size="middle" tabBarGutter={48} onChange={handleTabChange}>
        {tabs.map((tab, index) => (
          <TabPane tab={tab.title} key={tab.title.toLocaleLowerCase()} disabled={tab.disabled}>
            <TabContainer>{tab.Content}</TabContainer>
          </TabPane>
        ))}
      </Tabs>
    </DetailWrapper>
  );
};

export default ProfileDetail;
