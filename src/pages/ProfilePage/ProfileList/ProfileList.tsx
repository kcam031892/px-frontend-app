import { Col, Row, Typography } from 'antd';
import { ProfileCard } from 'components';
import React from 'react';
import { ProfileListWrapper } from './ProfileList.styled';
const { Title } = Typography;
const ProfileList = () => {
  return (
    <ProfileListWrapper>
      <Title>My Profile</Title>
      <Row gutter={[16, 32]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Col span={6} key={i}>
            <ProfileCard />
          </Col>
        ))}
      </Row>
    </ProfileListWrapper>
  );
};

export default ProfileList;
