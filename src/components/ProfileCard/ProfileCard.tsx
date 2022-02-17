import { Dropdown, Menu, Popover } from 'antd';
import React from 'react';
import { Button } from 'shared/theme/elements';
import {
  Avatar,
  ProfileCardContent,
  ProfileCardFooter,
  ProfileCardWrapper,
  ProfileTextContainer,
  Tag,
} from './ProfileCard.styled';
import { MoreOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);
const ProfileCard: React.FC = () => {
  const { push } = useHistory();
  const location = useLocation();
  const handleCardClick = () => {
    push(ROUTES.PROFILE_DETAIL, { id: 1 });
  };

  return (
    <ProfileCardWrapper>
      <ProfileCardContent
        style={{ background: 'url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png)' }}
        onClick={handleCardClick}
      >
        <Tag color="#333">PRIMARY</Tag>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
      </ProfileCardContent>
      <ProfileCardFooter>
        <ProfileTextContainer>
          <h1>World</h1>
          <h1>World</h1>
        </ProfileTextContainer>
        <Popover content={menu} placement="bottomLeft" trigger="click">
          <Button type="ghost">
            <MoreOutlined />
          </Button>
        </Popover>
      </ProfileCardFooter>
    </ProfileCardWrapper>
  );
};

export default ProfileCard;
