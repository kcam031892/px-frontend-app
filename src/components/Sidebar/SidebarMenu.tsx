import { Menu as AntMenu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { SIDEBAR_LIST } from 'shared/constants/SIDEBAR_LIST';
import { Menu } from './Sidebar.styled';

const { Item } = AntMenu;

const SidebarMenu = () => {
  return (
    <Menu>
      {SIDEBAR_LIST.map(({ title, to, Icon, disabled }) => (
        <Item key={title.toLocaleLowerCase()} icon={Icon} disabled={disabled}>
          <Link to={to}>{title}</Link>
        </Item>
      ))}
    </Menu>
  );
};

export default SidebarMenu;
